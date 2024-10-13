import { PERMISSIONS } from "../common/constants";
import { Module } from "../interfaces/common/enums";
import Access from "../features/auth/Access";
import FilterPanel from "../features/flight/schedule/FilterPanel";
import FlightPanel from "../features/flight/schedule/FlightPanel";

const Schedule: React.FC = () => {
  return (
    <Access permission={PERMISSIONS[Module.FLIGHTS].GET_ALL}>
      <div className="flex h-full items-stretch justify-between">
        <FilterPanel />
        <FlightPanel />
      </div>
    </Access>
  );
};

export default Schedule;
