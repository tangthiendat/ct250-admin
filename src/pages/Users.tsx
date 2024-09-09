import { Input } from "antd";
import AddUser from "../features/auth/users/AddUser";
import UsersTable from "../features/auth/users/UsersTable";
import { useState } from "react";
import { IUser } from "../interfaces";

const dataUser: IUser[] = [
  {
    id: 1,
    name: "Tang Thien Dat",
    email: "ttdat@gmail.com",
    role: "super_admin",
    status: "active",
    created_at: "2021-09-01",
    updated_at: "2023-09-02",
  },
  {
    id: 2,
    name: "Nguyen Quang Vinh",
    email: "nqvinh@gmail.com",
    role: "super_admin",
    status: "active",
    created_at: "2021-09-01",
    updated_at: "2023-09-02",
  },
  {
    id: 3,
    name: "Pham Quoc Khang",
    email: "pqkhang@gmail.com",
    role: "super_admin",
    status: "active",
    created_at: "2021-09-01",
    updated_at: "2023-09-02",
  },
  {
    id: 4,
    name: "Nguyen Van A",
    email: "aaa@gmail.com",
    role: "user",
    status: "active",
    created_at: "2021-09-01",
    updated_at: "2023-09-02",
  },
  {
    id: 5,
    name: "Nguyen Van B",
    email: "bbb@gmail.com",
    role: "admin",
    status: "inactive",
    created_at: "2021-09-01",
    updated_at: "2023-09-02",
  },
  {
    id: 6,
    name: "Nguyen Van C",
    email: "ccc@gmail.com",
    role: "super_admin",
    status: "inactive",
    created_at: "2021-09-01",
    updated_at: "2023-09-02",
  },
];

const Users: React.FC = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<IUser[]>(dataUser);

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const addUser = (newUser: IUser) => {
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser: IUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
  };

  return (
    <>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Danh sách Users</h2>

          <div className="w-[60%]">
            <div className="flex gap-3">
              <Input.Search
                placeholder="Nhập tên hoặc email của User để tìm kiếm..."
                onSearch={onSearch}
                enterButton
                allowClear
              />
            </div>
          </div>

          <AddUser addUser={addUser} idForNewUser={users.length + 1} />
        </div>
        <UsersTable search={search} users={users} updateUser={updateUser} />
      </div>
    </>
  );
};

export default Users;
