import { useQuery } from "@tanstack/react-query";
import { Button, Space, Table, TableProps, Tag, Timeline, Tooltip } from "antd";
import dayjs from "dayjs";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoAirplane } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import Loading from "../../../common/components/Loading";
import {
  BOOKING_STATUS_TRANSLATION,
  IBookingFlight,
  IBookingPassenger,
  PASSENGER_TYPE_TRANSLATION,
  PassengerType,
} from "../../../interfaces";
import { bookingService } from "../../../services/booking/booking-service";
import {
  colorFlightStatus,
  colorTicketClassName,
  getFormattedDuration,
} from "../../../utils";

const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: () => bookingService.getBooking(id!),
    queryKey: ["bookings", id],
  });
  if (isLoading) {
    return <Loading />;
  }

  const startFlight = data?.payload?.bookingFlights[0].flight;
  const returnFlight = data?.payload?.bookingFlights[1]?.flight;
  const booking = data?.payload;
  const columns: TableProps<IBookingFlight>["columns"] = [
    {
      title: "Nhóm hành khách",
      dataIndex: "bookingPassengers",
      key: "passengerGroup",
      width: "50%",
      render: (bookingPassengers: IBookingFlight["bookingPassengers"]) => {
        const uniquePassengerGroups = Array.from(
          new Set(
            bookingPassengers.map((passenger) => passenger.passengerGroup),
          ),
        );
        return (
          <ul>
            {uniquePassengerGroups.map((group, index) => (
              <strong>
                <li key={index}>
                  <strong style={{ color: "red" }}>
                    {group.split("-")[0]}
                  </strong>
                  {group
                    .split("-")
                    .slice(1)
                    .map((note, noteIndex) => (
                      <span key={noteIndex}>-{note}</span>
                    ))}
                </li>
              </strong>
            ))}
          </ul>
        );
      },
    },

    {
      title: "Hạng vé",
      dataIndex: "ticketClass",
      key: "ticketClass",
      render: (ticketClass: IBookingFlight["ticketClass"]) => {
        return (
          <span
            style={{
              color: colorTicketClassName(ticketClass.ticketClassName),
              fontWeight: 600,
            }}
          >
            {ticketClass.ticketClassName}
          </span>
        );
      },
    },
  ];

  const expandColumns: TableProps<IBookingPassenger>["columns"] = [
    {
      title: "Họ tên",
      key: "fullName",
      dataIndex: ["firstName", "lastName"],
      width: "4%",
      render: (text, record: IBookingPassenger) =>
        record
          ? `${record.passenger.lastName} ${record.passenger.firstName}`
          : "",
    },
    {
      title: "Loại hành khách",
      key: "passengerType",
      dataIndex: "passenger",
      width: "2%",
      render: (passenger: IBookingPassenger["passenger"]) => {
        if (!passenger) return null;
        let color = "";
        switch (passenger.passengerType) {
          case PassengerType.ADULT:
            color = "green";
            break;
          case PassengerType.CHILD:
            color = "blue";
            break;
          case PassengerType.INFANT:
            color = "orange";
            break;
        }
        return (
          <Tag color={color}>
            {PASSENGER_TYPE_TRANSLATION[passenger.passengerType]}
          </Tag>
        );
      },
    },
    {
      title: "Chỗ ngồi",
      key: "seatCode",
      dataIndex: "seatCode",
      width: "2%",
      render: (_, record: IBookingPassenger) =>
        record && record.seat ? `${record.seat.seatCode}` : "Đang xử lý",
    },
    {
      title: "Thức ăn",
      key: "mealName",
      dataIndex: "mealName",
      width: "4%",
      render: (_, record: IBookingPassenger) =>
        record && record.meals.length > 0
          ? record.meals.map((meal) => (
              <div key={meal.mealId}>{meal.mealName}</div>
            ))
          : "Không",
    },
    {
      title: "Hành lý",
      key: "baggageWeight",
      dataIndex: "baggageWeight",
      width: "2%",
      render: (_, record: IBookingPassenger) =>
        record.baggage ? `${record.baggage.baggageWeight} Kg` : "Không",
    },
    {
      title: "Hỗ trợ",
      key: "specialServices",
      dataIndex: "specialServices",
      width: "2%",
      render: (_, record: IBookingPassenger) =>
        record && record.specialServices.length > 0
          ? record.specialServices.map((specialService) => (
              <div key={specialService.specialServiceId}>
                {specialService.serviceName}
              </div>
            ))
          : "Không",
    },
  ];

  return (
    startFlight && (
      <div className="h-full">
        <Space align="start" size="small">
          <Tooltip title="Quay lại">
            <Button icon={<GoArrowLeft />} onClick={() => navigate(-1)} />
          </Tooltip>
          <div>
            <div className="mb-1 flex items-center gap-1 text-base font-bold">
              {returnFlight && (
                <>
                  <span>{startFlight.route.departureAirport.cityName}</span>
                  <FaArrowRightArrowLeft className="text-base" />
                  <span>{startFlight.route.arrivalAirport.cityName}</span>
                </>
              )}
              {!returnFlight && (
                <>
                  <GoArrowRight className="text-base" />
                </>
              )}
            </div>
            <Tag
              color={colorFlightStatus(data?.payload?.bookingStatus || "")}
              className="font-semibold"
            >
              {data?.payload?.bookingStatus &&
                BOOKING_STATUS_TRANSLATION[data.payload.bookingStatus]}
            </Tag>
          </div>
        </Space>
        <div className="card mt-3 flex min-h-[400px] gap-6 px-6 py-6">
          <div className="basis h-full">
            <Timeline
              mode="left"
              items={[
                {
                  className: "timeline-item-content",
                  label: (
                    <div>
                      <div className="text-lg font-semibold">
                        {dayjs(startFlight.departureDateTime).format("HH:mm")}
                      </div>
                      <div className="text-gray-500">
                        {dayjs(startFlight.departureDateTime).format(
                          "DD/MM/YYYY",
                        )}
                      </div>
                    </div>
                  ),
                  children: (
                    <div>
                      <div className="text-lg font-semibold">
                        {startFlight.route.departureAirport.cityName}
                      </div>
                      <div className="text-gray-500">
                        {`${startFlight.route.departureAirport.airportName} (${startFlight.route.departureAirport.airportCode})`}
                      </div>
                    </div>
                  ),
                },
                {
                  className: "timeline-item-content",
                  dot: <IoAirplane className="rotate-90 text-lg" />,
                  label: (
                    <div className="text-gray-500">
                      {getFormattedDuration(startFlight.route.duration)}
                    </div>
                  ),

                  children: (
                    <div>
                      <div className="text-lg font-semibold">
                        {startFlight.flightId}
                      </div>
                      <div className="text-gray-500">
                        {startFlight.airplane.model.modelName}
                      </div>
                    </div>
                  ),
                },
                {
                  label: (
                    <div>
                      <div className="text-lg font-semibold">
                        {dayjs(startFlight.arrivalDateTime).format("HH:mm")}
                      </div>
                      <div className="text-gray-500">
                        {dayjs(startFlight.arrivalDateTime).format(
                          "DD/MM/YYYY",
                        )}
                      </div>
                    </div>
                  ),
                  children: (
                    <div>
                      <div className="text-lg font-semibold">
                        {startFlight.route.arrivalAirport.cityName}
                      </div>
                      <div className="text-gray-500">
                        {`${startFlight.route.arrivalAirport.airportName} (${startFlight.route.arrivalAirport.airportCode})`}
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
                Thông tin chi tiết đoàn khách chuyến đi
              </div>
            </div>
            <Table
              rowKey={(record) => record.bookingFlightId}
              columns={columns}
              bordered={false}
              dataSource={booking?.bookingFlights.filter(
                (flight: IBookingFlight) =>
                  flight.flight.flightId === startFlight?.flightId,
              )}
              pagination={false}
              size="small"
              expandable={{
                columnWidth: "1%",
                expandedRowRender: () => (
                  <Table
                    columns={expandColumns}
                    rowKey={(record) => record.passenger.passengerId}
                    dataSource={booking?.bookingFlights[0].bookingPassengers}
                    pagination={false}
                    size="small"
                    rowClassName={(_, index) =>
                      index % 2 === 0 ? "table-row-light" : "table-row-gray"
                    }
                  />
                ),
                expandIcon: ({ expanded, onExpand, record }) => (
                  <Tooltip
                    title={
                      expanded
                        ? "Đóng chi tiết khách hàng"
                        : "Hiển thị chi tiết khách hàng"
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
        {/* ------------------------------------------------------------------ */}
        {returnFlight && (
          <div className="card mt-3 flex min-h-[400px] gap-6 px-6 py-6">
            <div className="basis h-full">
              <Timeline
                mode="left"
                items={[
                  {
                    className: "timeline-item-content",
                    label: (
                      <div>
                        <div className="text-lg font-semibold">
                          {dayjs(returnFlight?.departureDateTime).format(
                            "HH:mm",
                          )}
                        </div>
                        <div className="text-gray-500">
                          {dayjs(returnFlight?.departureDateTime).format(
                            "DD/MM/YYYY",
                          )}
                        </div>
                      </div>
                    ),
                    children: (
                      <div>
                        <div className="text-lg font-semibold">
                          {returnFlight?.route.departureAirport.cityName}
                        </div>
                        <div className="text-gray-500">
                          {`${returnFlight?.route.departureAirport.airportName} (${returnFlight.route.departureAirport.airportCode})`}
                        </div>
                      </div>
                    ),
                  },
                  {
                    className: "timeline-item-content",
                    dot: <IoAirplane className="rotate-90 text-lg" />,
                    label: (
                      <div className="text-gray-500">
                        {getFormattedDuration(
                          returnFlight?.route.duration ?? 0,
                        )}
                      </div>
                    ),

                    children: (
                      <div>
                        <div className="text-lg font-semibold">
                          {returnFlight.flightId}
                        </div>
                        <div className="text-gray-500">
                          {returnFlight.airplane.model.modelName}
                        </div>
                      </div>
                    ),
                  },
                  {
                    label: (
                      <div>
                        <div className="text-lg font-semibold">
                          {dayjs(returnFlight?.arrivalDateTime).format("HH:mm")}
                        </div>
                        <div className="text-gray-500">
                          {dayjs(returnFlight?.arrivalDateTime).format(
                            "DD/MM/YYYY",
                          )}
                        </div>
                      </div>
                    ),
                    children: (
                      <div>
                        <div className="text-lg font-semibold">
                          {returnFlight?.route.arrivalAirport.cityName}
                        </div>
                        <div className="text-gray-500">
                          {`${returnFlight.route.arrivalAirport.airportName} (${returnFlight.route.arrivalAirport.airportCode})`}
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
                  Thông tin chi tiết đoàn khách chuyến về
                </div>
              </div>
              <Table
                rowKey={(record) => record.bookingFlightId}
                columns={columns}
                bordered={false}
                dataSource={booking?.bookingFlights.filter(
                  (flight: IBookingFlight) =>
                    flight.flight.flightId === returnFlight?.flightId,
                )}
                pagination={false}
                size="small"
                expandable={{
                  columnWidth: "1%",

                  expandedRowRender: () => (
                    <Table
                      columns={expandColumns}
                      rowKey={(record) => record.passenger.passengerId}
                      dataSource={booking?.bookingFlights[0].bookingPassengers}
                      pagination={false}
                      size="small"
                      rowClassName={(_, index) =>
                        index % 2 === 0 ? "table-row-light" : "table-row-gray"
                      }
                    />
                  ),
                  expandIcon: ({ expanded, onExpand, record }) => (
                    <Tooltip
                      title={
                        expanded
                          ? "Đóng chi tiết đoàn khách"
                          : "Hiển thị chi đoàn khách"
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
        )}
      </div>
    )
  );
};

export default BookingDetails;
