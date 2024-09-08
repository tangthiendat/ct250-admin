import AddPermission from "../features/auth/AddPermission";
import PermissionTable from "../features/auth/PermissionTable";

const Permissions: React.FC = () => {
  return (
    <div className="card">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quyền hạn</h2>
        <AddPermission />
      </div>
      <PermissionTable />
    </div>
  );
};

export default Permissions;
