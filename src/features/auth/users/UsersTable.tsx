import React from "react";
import { Space, Table } from "antd";
import { formatDate } from "date-fns";
import { TableProps, Badge } from "antd";
import { IUser } from "../../../interfaces";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

interface UsersTableProps {
  search: string;
  users: IUser[];
  updateUser: (user: IUser) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  search,
  users,
  updateUser,
}) => {
  const filteredUsers = users.filter((user: IUser) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const columns: TableProps<IUser>["columns"] = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
      width: "5%",
      align: "center",
    },
    {
      key: "name",
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      key: "role",
      title: "Vai trò",
      dataIndex: "role",
      width: "5%",
      align: "center",
      filters: [
        { text: "Admin", value: "admin" },
        { text: "User", value: "-" },
        { text: "Super Admin", value: "super_admin" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role: string) => {
        return role === "admin" ? (
          <p className="text-green-600">{role.toUpperCase()}</p>
        ) : role === "super_admin" ? (
          <p className="text-blue-600">{role.toUpperCase()}</p>
        ) : (
          <p>-</p>
        );
      },
    },
    {
      key: "status",
      title: "Trạng thái",
      dataIndex: "status",
      width: "10%",
      align: "center",
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: string) => {
        return status === "active" ? (
          <Badge status="success" text="active" />
        ) : (
          <Badge status="error" text="inactive" />
        );
      },
    },
    {
      key: "created_at",
      title: "Ngày tạo",
      dataIndex: "created_at",
      align: "center",
      render: (created_at: string) =>
        formatDate(new Date(created_at), "dd-MM-yyyy hh:mm:ss"),
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
    {
      key: "updated_at",
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      align: "center",
      render: (updated_at: string) =>
        formatDate(new Date(updated_at), "dd-MM-yyyy hh:mm:ss"),
      sorter: (a, b) =>
        new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
    },
    {
      title: "Hành động",
      key: "action",
      width: "10%",
      align: "center",
      render: (record: IUser) => (
        <Space>
          <UpdateUser user={record} updateUser={updateUser} />
          <DeleteUser />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={(record: IUser) => record.id}
      dataSource={filteredUsers}
      size="small"
    />
  );
};

export default UsersTable;
