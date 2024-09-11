import AddRole from "../features/auth/roles/AddRole";
import RolesTable from "../features/auth/roles/RolesTable";

const Role: React.FC = () => {
  return (
    <div className="card">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Vai trò</h2>
        <AddRole />
      </div>
      <RolesTable />
    </div>
  );
};

export default Role;
