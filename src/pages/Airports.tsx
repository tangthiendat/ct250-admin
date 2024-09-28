import { ALL_PERMISSIONS } from "../constants";
import Access from "../features/auth/Access";
import AddAirport from "../features/flight/airport/AddAirport";
import AirportTable from "../features/flight/airport/AirportTable";

const Airport: React.FC = () => {
  return (
    <Access permission={ALL_PERMISSIONS.AIRPORTS.GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Sân bay</h2>
          <Access permission={ALL_PERMISSIONS.AIRPORTS.CREATE} hideChildren>
            <AddAirport />
          </Access>
        </div>
        <AirportTable />
      </div>
    </Access>
  );
};
export default Airport;
