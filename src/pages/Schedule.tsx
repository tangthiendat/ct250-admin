import Access from "../features/auth/Access";
import FlightPanel from "../features/flight/schedule/FlightPanel";
import { PERMISSIONS } from "../interfaces/common/constants";
import { Module } from "../interfaces/common/enums";
import { useDynamicTitle } from "../utils";

const Schedule: React.FC = () => {
  useDynamicTitle("Quản lý lịch trình - DaViKa Airways");

  return (
    <Access permission={PERMISSIONS[Module.FLIGHTS].GET_ALL}>
      <FlightPanel />
    </Access>
  );
};

export default Schedule;
