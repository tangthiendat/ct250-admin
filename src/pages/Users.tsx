import { Input } from "antd";
import Access from "../features/auth/Access";
import { ALL_PERMISSIONS } from "../constants";
// import AddUser from "../features/auth/users/AddUser";
// import UsersTable from "../features/auth/users/UsersTable";
// import { useState } from "react";
// import { IUser } from "../interfaces";

// const dataUser: IUser[] = [
//   {
//     id: 1,
//     name: "Tang Thien Dat",
//     email: "ttdat@gmail.com",
//     role: "super_admin",
//     active: true,
//     created_at: "2021-09-01",
//     updated_at: "2023-09-02",
//   },
//   {
//     id: 2,
//     name: "Nguyen Quang Vinh",
//     email: "nqvinh@gmail.com",
//     role: "super_admin",
//     active: true,
//     created_at: "2021-09-01",
//     updated_at: "2023-09-02",
//   },
//   {
//     id: 3,
//     name: "Pham Quoc Khang",
//     email: "pqkhang@gmail.com",
//     role: "super_admin",
//     active: true,
//     created_at: "2021-09-01",
//     updated_at: "2023-09-02",
//   },
//   {
//     id: 4,
//     name: "Nguyen Van A",
//     email: "aaa@gmail.com",
//     role: "user",
//     active: true,
//     created_at: "2021-09-01",
//     updated_at: "2023-09-02",
//   },
//   {
//     id: 5,
//     name: "Nguyen Van B",
//     email: "bbb@gmail.com",
//     role: "admin",
//     active: false,
//     created_at: "2021-09-01",
//     updated_at: "2023-09-02",
//   },
//   {
//     id: 6,
//     name: "Nguyen Van C",
//     email: "ccc@gmail.com",
//     role: "super_admin",
//     active: false,
//     created_at: "2021-09-01",
//     updated_at: "2023-09-02",
//   },
// ];

const Users: React.FC = () => {
  // const [search, setSearch] = useState("");
  // const [users, setUsers] = useState<IUser[]>(dataUser);

  // const onSearch = (value: string) => {
  //   setSearch(value);
  // };

  // function calculateIDForNewUser(): number {
  //   // Các id từ 1 đến id lớn nhất trong mảng users nếu không liên tục thì sẽ lấy id đầu tiên của các id thiếu đó.
  //   // Nếu id các user đã liên tục thì id mới sẽ là id lớn nhất + 1.

  //   const ids = users.map((user) => user.id).sort((a, b) => a - b);
  //   for (let i = 0; i < ids.length; i++) {
  //     if (ids[i] !== i + 1) {
  //       return i + 1;
  //     }
  //   }
  //   return ids[ids.length - 1] + 1;
  // }

  // const addUser = (newUser: IUser) => {
  //   setUsers([...users, newUser]);
  // };

  // const updateUser = (updatedUser: IUser) => {
  //   setUsers(
  //     users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
  //   );
  // };

  // const deleteUser = (userId: number) => {
  //   setUsers(users.filter((user) => user.id !== userId));
  // };

  return (
    <Access permission={ALL_PERMISSIONS.USERS.GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Danh sách Users</h2>

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

          {/* <AddUser addUser={addUser} IDForNewUser={calculateIDForNewUser()} /> */}
        </div>
        {/* <UsersTable
          search={search}
          users={users}
          updateUser={updateUser}
          deleteUser={deleteUser}
        /> */}
      </div>
    </Access>
  );
};

export default Users;
