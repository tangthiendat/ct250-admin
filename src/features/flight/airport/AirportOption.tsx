import { Tag } from "antd";
import { IAirport } from "../../../interfaces";

interface AirportOptionProps {
  airport: IAirport;
}

const AirportOption: React.FC<AirportOptionProps> = ({ airport }) => {
  return (
    <div className="p-1">
      <div className="flex flex-wrap justify-between font-semibold">
        <div className="text-wrap text-base">{airport.cityName}</div>
        <Tag color="blue" bordered={false} className="text-base font-semibold">
          {airport.airportCode}
        </Tag>
      </div>
      <div>
        <span>{airport.airportName}</span>
      </div>
    </div>
  );
};

export default AirportOption;
