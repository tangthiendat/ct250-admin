import { PERMISSIONS } from "../interfaces/common/constants";
import { Module } from "../interfaces/common/enums";
import Access from "../features/auth/Access";
import AddPermission from "../features/auth/permissions/AddPermission";
import PermissionsTable from "../features/auth/permissions/PermissionsTable";
import { useDynamicTitle } from "../utils";

const Permissions: React.FC = () => {
  useDynamicTitle("Quản lý quyền hạn - DaViKa Airways");

  return (
    <Access permission={PERMISSIONS[Module.PERMISSIONS].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Quyền hạn</h2>
          <Access
            permission={PERMISSIONS[Module.PERMISSIONS].CREATE}
            hideChildren
          >
            <AddPermission />
          </Access>
        </div>
        <PermissionsTable />
      </div>
    </Access>
  );
};

export default Permissions;
