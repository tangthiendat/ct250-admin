import { PERMISSIONS } from "../common/constants";
import { Module } from "../common/enums";
import Access from "../features/auth/Access";
import AddRole from "../features/auth/roles/AddRole";
import RolesTable from "../features/auth/roles/RolesTable";

const Role: React.FC = () => {
  return (
    <Access permission={PERMISSIONS[Module.ROLES].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Vai trò</h2>
          <Access permission={PERMISSIONS[Module.ROLES].CREATE} hideChildren>
            <AddRole />
          </Access>
        </div>
        <RolesTable />
      </div>
    </Access>
  );
};

export default Role;
