import { Button, Divider, Tag } from "antd";
import dayjs from "dayjs";
import { GoDotFill } from "react-icons/go";
import { IoAirplane } from "react-icons/io5";
import { useNavigate } from "react-router";
import { IFlightSchedule, PRIMARY_COLOR } from "../../../interfaces";
import { colorFlightStatus, getFormattedDuration } from "../../../utils";

interface FlightProps {
  flight: IFlightSchedule;
}

const Flight: React.FC<FlightProps> = ({ flight }) => {
  const formattedDuration = getFormattedDuration(flight.route.duration);
  const navigate = useNavigate();
  return (
    <div className="mb-3 rounded-lg bg-white">
      <div className="flex flex-col items-stretch">
        <div className="flex items-center justify-between p-3">
          <div className="basis-[10%] text-center text-lg font-semibold">
            <div>{flight.flightId}</div>
            <Tag color={colorFlightStatus(flight.flightStatus)}>
              {flight.flightStatus}
            </Tag>
          </div>
          <div className="mx-0 self-stretch">
            <Divider
              style={{
                borderColor: "#d1d5db",
                // paddingTop: "0.5rem",
                // margin: "0",
                height: "100%",
              }}
              type="vertical"
            />
          </div>
          <div className="flex basis-[87%] items-center justify-between gap-2">
            <div className="px-4 text-center">
              <div className="text-lg font-semibold">
                {dayjs(flight.departureDateTime).format("DD/MM/YYYY HH:mm")}
              </div>
              <div className="text-sm text-gray-500">
                {flight.route.departureAirport.cityName}
              </div>
            </div>

            <div className="flex w-[60%] flex-col items-center">
              <div className="flex w-full items-center justify-between">
                <div className="basis-[15%] text-center text-sm text-gray-500">
                  {flight.route.departureAirport.airportCode}
                </div>
                <GoDotFill style={{ color: PRIMARY_COLOR }} />
                <div className="w-full">
                  <Divider
                    style={{ borderColor: "blue", margin: "0.25rem 0" }}
                    variant="dashed"
                  >
                    <IoAirplane
                      style={{ color: PRIMARY_COLOR }}
                      className="text-lg"
                    />
                  </Divider>
                </div>
                <GoDotFill style={{ color: PRIMARY_COLOR }} />
                <p className="basis-[15%] text-center text-sm text-gray-500">
                  {flight.route.arrivalAirport.airportCode}
                </p>
              </div>
              <p className="text-center text-xs">{formattedDuration}</p>
            </div>
            <div className="px-4 text-center">
              <div className="text-lg font-semibold">
                {dayjs(flight.arrivalDateTime).format("DD/MM/YYYY HH:mm")}
              </div>
              <div className="text-sm text-gray-500">
                {flight.route.arrivalAirport.cityName}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-0 px-4">
          <Divider
            style={{
              borderColor: "#d1d5db",
              marginTop: "0.5rem",
              marginBottom: "0",
              fontWeight: "bold",
            }}
          />
        </div>
        <div className="flex items-center justify-end px-2">
          <Button
            type="primary"
            className="my-3"
            onClick={() => navigate(`${flight.flightId}`)}
          >
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Flight;
