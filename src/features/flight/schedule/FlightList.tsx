import { IFlightSchedule } from "../../../interfaces";
import Flight from "./Flight";

interface FlightListProps {
  flights: IFlightSchedule[];
}

const FlightList: React.FC<FlightListProps> = ({ flights }) => {
  return (
    <div className="mx-3">
      {flights.map((flight) => (
        <Flight key={flight.flightId} flight={flight} />
      ))}
    </div>
  );
};

export default FlightList;
