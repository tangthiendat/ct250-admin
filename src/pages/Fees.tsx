import Access from "../features/auth/Access";
import AddFee from "../features/flight/fee/AddFee";
import FeesTable from "../features/flight/fee/FeesTable";
import { Module, PERMISSIONS } from "../interfaces";
import { useDynamicTitle } from "../utils";

const Fees: React.FC = () => {
  useDynamicTitle("Quản lý các loại phí - DaViKa Airways");

  return (
    <Access permission={PERMISSIONS[Module.FEES].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Lệ phí</h2>
          <Access permission={PERMISSIONS[Module.FEES].CREATE} hideChildren>
            <AddFee />
          </Access>
        </div>
        <FeesTable />
      </div>
    </Access>
  );
};

export default Fees;
