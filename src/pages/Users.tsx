import { Input } from "antd";
import Access from "../features/auth/Access";
import { ALL_PERMISSIONS } from "../constants";
import UsersTable from "../features/auth/users/UsersTable";
import AddUser from "../features/auth/users/AddUser";

const Users: React.FC = () => {
  return (
    <Access permission={ALL_PERMISSIONS.USERS.GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Danh sách người dùng</h2>

          <div className="w-[60%]">
            <div className="flex gap-3">
              <Input.Search
                placeholder="Nhập tên hoặc email của User để tìm kiếm..."
                // onSearch={onSearch}
                enterButton
                allowClear
              />
            </div>
          </div>

          <Access permission={ALL_PERMISSIONS.USERS.CREATE}>
            <AddUser />
          </Access>
        </div>
        <UsersTable />
      </div>
    </Access>
  );
};

export default Users;
