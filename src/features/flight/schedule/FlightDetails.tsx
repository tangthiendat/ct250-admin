import { useQuery } from "@tanstack/react-query";
import { Button, Space, Table, TableProps, Tag, Timeline, Tooltip } from "antd";
import dayjs from "dayjs";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoAirplane } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import Loading from "../../../common/components/Loading";
import { IFlightPricing, SeatAvailabilityStatus } from "../../../interfaces";
import { flightScheduleService } from "../../../services";
import {
  colorFlightStatus,
  colorTicketClassName,
  getFormattedDuration,
  isInDateRange,
} from "../../../utils";
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
      title: "Giá vé cơ bản hiện tại",
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

  const expandColumns: TableProps<IFlightPricing>["columns"] = [
    {
      title: "ID",
      key: "flightPricingId",
      dataIndex: "flightPricingId",
      width: "10%",
    },
    {
      title: "Giá vé cơ bản",
      key: "ticketPrice",
      dataIndex: "ticketPrice",
      width: "30%",
      render: (price: number) => price.toLocaleString(),
    },
    {
      title: "Ngày bắt đầu",
      key: "validFrom",
      dataIndex: "validFrom",
      width: "30%",
      render: (validFrom: string) => dayjs(validFrom).format("YYYY-MM-DD"),
    },
    {
      title: "Ngày kết thúc",
      key: "validTo",
      dataIndex: "validTo",
      width: "30%",
      render: (validTo: string) => dayjs(validTo).format("YYYY-MM-DD"),
    },
  ];

  return (
    flight && (
      <div className="h-full">
        <Space align="start" size="small">
          <Tooltip title="Quay lại">
            <Button icon={<GoArrowLeft />} onClick={() => navigate(-1)} />
          </Tooltip>
          <div>
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
              <div className="text-lg font-bold">Thông tin về các hạng vé</div>
              <ViewSeatAvailability flight={flight} />
            </div>
            <Table
              rowKey={(record) => record.flightPricingId}
              columns={columns}
              bordered={false}
              dataSource={flight.flightPricing.filter((pricing) =>
                isInDateRange(
                  dayjs().tz().format("YYYY-MM-DD"),
                  pricing.validFrom,
                  pricing.validTo,
                ),
              )}
              pagination={false}
              size="small"
              expandable={{
                columnWidth: "5%",
                expandedRowRender: (record: IFlightPricing) => (
                  <Table
                    columns={expandColumns}
                    dataSource={flight.flightPricing.filter(
                      (pricing) =>
                        pricing.ticketClass.ticketClassId ===
                        record.ticketClass.ticketClassId,
                    )}
                    pagination={false}
                    size="small"
                  />
                ),
                expandIcon: ({ expanded, onExpand, record }) => (
                  <Tooltip
                    title={
                      expanded ? "Đóng chi tiết giá" : "Hiển thị chi tiết giá"
                    }
                  >
                    {expanded ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onExpand(record, e);
                        }}
                        type="button"
                        className="ant-table-row-expand-icon ant-table-row-expand-icon-expanded"
                        aria-label="Thu gọn dòng"
                        aria-expanded="true"
                      ></button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onExpand(record, e);
                        }}
                        type="button"
                        className="ant-table-row-expand-icon ant-table-row-expand-icon-collapsed"
                        aria-label="Mở rộng dòng"
                        aria-expanded="false"
                      ></button>
                    )}
                  </Tooltip>
                ),
              }}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default FlightDetails;
