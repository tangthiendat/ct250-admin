import Access from "../features/auth/Access";
import FeesTable from "../features/flight/fee/FeesTable";
import { Module, PERMISSIONS } from "../interfaces";

const Fees: React.FC = () => {
  return (
    <Access permission={PERMISSIONS[Module.FEES].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Lệ phí</h2>
          <Access permission={PERMISSIONS[Module.ROLES].CREATE} hideChildren>
            {/* <AddRole /> */}
          </Access>
        </div>
        <FeesTable />
      </div>
    </Access>
  );
};

export default Fees;
