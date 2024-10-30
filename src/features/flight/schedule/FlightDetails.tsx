import { useQuery } from "@tanstack/react-query";
import { Button, Space, Table, TableProps, Tag, Timeline } from "antd";
import dayjs from "dayjs";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoAirplane } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import Loading from "../../../common/components/Loading";
import {
  IFlightPricing,
  Module,
  PERMISSIONS,
  SeatAvailabilityStatus,
} from "../../../interfaces";
import { flightScheduleService } from "../../../services";
import {
  colorFlightStatus,
  colorTicketClassName,
  getFormattedDuration,
} from "../../../utils";
import Access from "../../auth/Access";
import ViewSeatAvailability from "./ViewSeatAvailability";

const FlightDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: () => flightScheduleService.getFlight(id!),
    queryKey: ["flights", id],
  });
  if (isLoading) {
    return <Loading />;
  }
  const flight = data?.payload;
  const columns: TableProps<IFlightPricing>["columns"] = [
    {
      title: "Hạng vé",
      dataIndex: "ticketClass",
      key: "ticketClass",
      render: (ticketClass: IFlightPricing["ticketClass"]) => (
        <span
          style={{
            color: colorTicketClassName(ticketClass.ticketClassName),
            fontWeight: 600,
          }}
        >
          {ticketClass.ticketClassName}
        </span>
      ),
    },
    {
      title: "Giá vé cơ bản",
      dataIndex: "ticketPrice",
      key: "ticketPrice",
      render: (ticketPrice: IFlightPricing["ticketPrice"]) =>
        ticketPrice.toLocaleString(),
    },
    {
      title: "Tổng số chỗ ngồi",
      key: "totalSeats",
      render: (_, record: IFlightPricing) => {
        return flight?.seatAvailability.filter(
          (availability) =>
            availability.seat.ticketClass ===
            record.ticketClass.ticketClassName,
        ).length;
      },
    },
    {
      title: "Số chỗ trống",
      key: "availableSeats",
      render: (_, record: IFlightPricing) => {
        return flight?.seatAvailability.filter(
          (availability) =>
            availability.seat.ticketClass ===
              record.ticketClass.ticketClassName &&
            availability.status === SeatAvailabilityStatus.AVAILABLE,
        ).length;
      },
    },
  ];

  return (
    <Access
      permission={PERMISSIONS[Module.FLIGHTS].GET_BY_ID}
      hideChildren={false}
    >
      {flight && (
        <div className="h-full">
          <Space align="start" size="small">
            <Button icon={<GoArrowLeft />} onClick={() => navigate(-1)} />
            <div>
              <p className="mb-1 text-gray-500">Trở về trang trước</p>
              <div className="mb-1 flex items-center gap-1 text-base font-bold">
                <span>{flight.route.departureAirport.cityName}</span>
                <GoArrowRight className="text-base" />
                <span>{flight.route.arrivalAirport.cityName}</span>
              </div>
              {/* <p className="text-gray-500">{flight.airplane.model.modelName}</p> */}
              <Tag
                color={colorFlightStatus(flight.flightStatus)}
                className="font-semibold"
              >
                {flight.flightStatus}
              </Tag>
            </div>
          </Space>
          <div className="card mt-3 flex min-h-[400px] gap-6 px-6 py-6">
            <div className="h-full basis-1/3">
              <Timeline
                mode="left"
                items={[
                  {
                    className: "timeline-item-content",
                    label: (
                      <div>
                        <div className="text-lg font-semibold">
                          {dayjs(flight.departureDateTime).format("HH:mm")}
                        </div>
                        <div className="text-gray-500">
                          {dayjs(flight.departureDateTime).format("DD/MM/YYYY")}
                        </div>
                      </div>
                    ),
                    children: (
                      <div>
                        <div className="text-lg font-semibold">
                          {flight.route.departureAirport.cityName}
                        </div>
                        <div className="text-gray-500">
                          {`${flight.route.departureAirport.airportName} (${flight.route.departureAirport.airportCode})`}
                        </div>
                      </div>
                    ),
                  },
                  {
                    className: "timeline-item-content",
                    dot: <IoAirplane className="rotate-90 text-lg" />,
                    label: (
                      <div className="text-gray-500">
                        {getFormattedDuration(flight.route.duration)}
                      </div>
                    ),

                    children: (
                      <div>
                        <div className="text-lg font-semibold">
                          {flight.flightId}
                        </div>
                        <div className="text-gray-500">
                          {flight.airplane.model.modelName}
                        </div>
                      </div>
                    ),
                  },
                  {
                    label: (
                      <div>
                        <div className="text-lg font-semibold">
                          {dayjs(flight.arrivalDateTime).format("HH:mm")}
                        </div>
                        <div className="text-gray-500">
                          {dayjs(flight.arrivalDateTime).format("DD/MM/YYYY")}
                        </div>
                      </div>
                    ),
                    children: (
                      <div>
                        <div className="text-lg font-semibold">
                          {flight.route.arrivalAirport.cityName}
                        </div>
                        <div className="text-gray-500">
                          {`${flight.route.arrivalAirport.airportName} (${flight.route.arrivalAirport.airportCode})`}
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
            <div className="mt-20 flex-1 px-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-lg font-bold">
                  Thông tin về các hạng vé
                </div>
                <ViewSeatAvailability flight={flight} />
              </div>
              <Table
                rowKey={(record) => record.flightPricingId}
                columns={columns}
                bordered={false}
                dataSource={flight.flightPricing}
                pagination={false}
                size="small"
              />
            </div>
          </div>
        </div>
      )}
    </Access>
  );
};

export default FlightDetails;
