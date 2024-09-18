import React, { useState } from "react";
import { Space, Table, TablePaginationConfig, Tag } from "antd";
import { format } from "date-fns";
import { TableProps } from "antd";
import { IUser } from "../../../interfaces";
import { useSearchParams } from "react-router-dom";
import { userService } from "../../../services/user-service";
import { useQuery } from "@tanstack/react-query";
import UpdateUser from "./UpdateUser";
import Access from "../Access";
import { ALL_PERMISSIONS } from "../../../constants";

//   {
//     userId: "4d967bff-9735-4cca-bc3e-5237b6aebbdf",
//     email: "admin@gmail.com",
//     firstName: "I am",
//     lastName: "ADMIN",
//     gender: "MALE",
//     identityNumber: "123456789000",
//     phoneNumber: "0123456789",
//     active: true,
//     dateOfBirth: "2000-05-03",
//     role: {
//       roleId: 1,
//       roleName: "ADMIN",
//       description: "Admin thì full permissions",
//       active: true,
//       permissions: [
//         {
//           permissionId: 1,
//           name: "Create a user",
//           apiPath: "/api/v1/users",
//           method: "POST",
//           module: "USERS",
//           createdAt: "2024-09-18T14:25:52.884027",
//         },
//         {
//           permissionId: 2,
//           name: "Update a user",
//           apiPath: "/api/v1/users/{id}",
//           method: "PUT",
//           module: "USERS",
//           createdAt: "2024-09-18T14:25:52.891306",
//         },
//         {
//           permissionId: 3,
//           name: "Delete a user",
//           apiPath: "/api/v1/users/{id}",
//           method: "DELETE",
//           module: "USERS",
//           createdAt: "2024-09-18T14:25:52.892269",
//         },
//         {
//           permissionId: 4,
//           name: "Get a user by id",
//           apiPath: "/api/v1/users/{id}",
//           method: "GET",
//           module: "USERS",
//           createdAt: "2024-09-18T14:25:52.892969",
//         },
//         {
//           permissionId: 5,
//           name: "Get logged in user",
//           apiPath: "/api/v1/users/logged-in",
//           method: "GET",
//           module: "USERS",
//           createdAt: "2024-09-18T14:25:52.893636",
//         },
//         {
//           permissionId: 6,
//           name: "Get users with pagination",
//           apiPath: "/api/v1/users",
//           method: "GET",
//           module: "USERS",
//           createdAt: "2024-09-18T14:25:52.894241",
//         },
//         {
//           permissionId: 7,
//           name: "Create a role",
//           apiPath: "/api/v1/roles",
//           method: "POST",
//           module: "ROLES",
//           createdAt: "2024-09-18T14:25:52.895084",
//         },
//         {
//           permissionId: 8,
//           name: "Update a role",
//           apiPath: "/api/v1/roles/{id}",
//           method: "PUT",
//           module: "ROLES",
//           createdAt: "2024-09-18T14:25:52.895974",
//         },
//         {
//           permissionId: 9,
//           name: "Delete a role",
//           apiPath: "/api/v1/roles/{id}",
//           method: "DELETE",
//           module: "ROLES",
//           createdAt: "2024-09-18T14:25:52.896674",
//         },
//         {
//           permissionId: 10,
//           name: "Get a role by id",
//           apiPath: "/api/v1/roles/{id}",
//           method: "GET",
//           module: "ROLES",
//           createdAt: "2024-09-18T14:25:52.897378",
//         },
//         {
//           permissionId: 11,
//           name: "Get roles with pagination",
//           apiPath: "/api/v1/roles",
//           method: "GET",
//           module: "ROLES",
//           createdAt: "2024-09-18T14:25:52.897917",
//         },
//         {
//           permissionId: 12,
//           name: "Create a permission",
//           apiPath: "/api/v1/permissions",
//           method: "POST",
//           module: "PERMISSIONS",
//           createdAt: "2024-09-18T14:25:52.898444",
//         },
//         {
//           permissionId: 13,
//           name: "Update a permission",
//           apiPath: "/api/v1/permissions/{id}",
//           method: "PUT",
//           module: "PERMISSIONS",
//           createdAt: "2024-09-18T14:25:52.89904",
//         },
//         {
//           permissionId: 14,
//           name: "Delete a permission",
//           apiPath: "/api/v1/permissions/{id}",
//           method: "DELETE",
//           module: "PERMISSIONS",
//           createdAt: "2024-09-18T14:25:52.899847",
//         },
//         {
//           permissionId: 15,
//           name: "Get a permission by id",
//           apiPath: "/api/v1/permissions/{id}",
//           method: "GET",
//           module: "PERMISSIONS",
//           createdAt: "2024-09-18T14:25:52.900489",
//         },
//         {
//           permissionId: 16,
//           name: "Get permissions with pagination",
//           apiPath: "/api/v1/permissions",
//           method: "GET",
//           module: "PERMISSIONS",
//           createdAt: "2024-09-18T14:25:52.901065",
//         },
//         {
//           permissionId: 17,
//           name: "Get all permissions",
//           apiPath: "/api/v1/permissions/all",
//           method: "GET",
//           module: "PERMISSIONS",
//           createdAt: "2024-09-18T14:25:52.90173",
//         },
//       ],
//       createdAt: "2024-09-18T14:25:52.940725",
//     },
//     createdAt: "2024-09-18T14:25:53.089744",
//   },
// ];

interface TableParams {
  pagination: TablePaginationConfig;
}
const UsersTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} vai trò`,
    },
  }));

  const pagination = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["users", pagination],
    queryFn: () => userService.getUsers(pagination),
  });

  const handleTableChange: TableProps<IUser>["onChange"] = (
    pagination,
    filters,
    sorter,
  ) => {
    setTableParams((prev) => ({
      ...prev,
      pagination,
      sorter,
      filters,
    }));
    searchParams.set("page", String(pagination.current));
    searchParams.set("pageSize", String(pagination.pageSize));
    setSearchParams(searchParams);
  };

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Tên đệm và tên",
      key: "firstName",
      dataIndex: "firstName",
      width: "15%",
    },
    {
      title: "Họ",
      key: "lastName",
      dataIndex: "lastName",
      width: "10%",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      key: "role",
      title: "Vai trò",
      dataIndex: "role",
      width: "10%",
      render: (role) => role.roleName,
    },
    {
      key: "active",
      title: "Trạng thái",
      dataIndex: "active",
      width: "8%",
      render: (active: boolean) => (
        <Tag color={active ? "green" : "red"}>
          {active ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
    },
    {
      key: "createdAt",
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: "15%",
      render: (createdAt: string) =>
        createdAt ? format(new Date(createdAt), "dd-MM-yyyy hh:mm:ss") : "",
    },
    {
      key: "updatedAt",
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      width: "15%",
      render: (updatedAt: string) =>
        updatedAt ? format(new Date(updatedAt), "dd-MM-yyyy hh:mm:ss") : "",
    },
    {
      title: "Hành động",
      key: "action",

      render: (record: IUser) => (
        <Space>
          <Access permission={ALL_PERMISSIONS.USERS.UPDATE}>
            <UpdateUser user={record} />
          </Access>
          {/* <DeleteUser userID={record.id} deleteUser={deleteUser} /> */}
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={(record: IUser) => record.userId}
      pagination={tableParams.pagination}
      dataSource={data?.payload?.content}
      loading={{
        spinning: isLoading,
        tip: "Đang tải dữ liệu...",
      }}
      onChange={handleTableChange}
      size="small"
    />
  );
};

export default UsersTable;
