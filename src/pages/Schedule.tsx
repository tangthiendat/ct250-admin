import { PERMISSIONS } from "../interfaces/common/constants";
import Access from "../features/auth/Access";
import FlightPanel from "../features/flight/schedule/FlightPanel";
import { Module } from "../interfaces/common/enums";

const Schedule: React.FC = () => {
  return (
    <Access permission={PERMISSIONS[Module.FLIGHTS].GET_ALL}>
      <FlightPanel />
    </Access>
  );
};

export default Schedule;
