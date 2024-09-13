import AddPermission from "../features/auth/permissions/AddPermission";
import PermissionsTable from "../features/auth/permissions/PermissionsTable";

const Permissions: React.FC = () => {
  return (
    <div className="card">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quyền hạn</h2>
        <AddPermission />
      </div>
      <PermissionsTable />
    </div>
  );
};

export default Permissions;
