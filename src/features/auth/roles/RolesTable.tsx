import { Space, Table, TableProps, Tag } from "antd";
import { IPermission, IRole } from "../../../interfaces";
import { formatDate } from "date-fns";
import UpdateRole from "./UpdateRole";
import DeleteRole from "./DeleteRole";

const permissionData: IPermission[] = [
  {
    permissionId: 1,
    name: "Create a user",
    apiPath: "/api/v1/users",
    method: "POST",
    module: "USERS",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 2,
    name: "Read a user",
    apiPath: "/api/v1/users",
    method: "GET",
    module: "USERS",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 3,
    name: "Update a user",
    apiPath: "/api/v1/users/{id}",
    method: "PUT",
    module: "USERS",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 4,
    name: "Delete a user",
    apiPath: "/api/v1/users/{id}",
    method: "DELETE",
    module: "USERS",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 5,
    name: "Create a role",
    apiPath: "/api/v1/roles",
    method: "POST",
    module: "ROLES",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 6,
    name: "Read a role",
    apiPath: "/api/v1/roles",
    method: "GET",
    module: "ROLES",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 7,
    name: "Update a role",
    apiPath: "/api/v1/roles/{id}",
    method: "PUT",
    module: "ROLES",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 8,
    name: "Delete a role",
    apiPath: "/api/v1/roles/{id}",
    method: "DELETE",
    module: "ROLES",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 9,
    name: "Create a permission",
    apiPath: "/api/v1/permissions",
    method: "POST",
    module: "PERMISSIONS",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 10,
    name: "Read a permission",
    apiPath: "/api/v1/permissions",
    method: "GET",
    module: "PERMISSIONS",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 11,
    name: "Update a permission",
    apiPath: "/api/v1/permissions/{id}",
    method: "PUT",
    module: "PERMISSIONS",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 12,
    name: "Delete a permission",
    apiPath: "/api/v1/permissions/{id}",
    method: "DELETE",
    module: "PERMISSIONS",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
];

const rolesData: IRole[] = [
  {
    roleId: 1,
    name: "ADMIN",
    description: "Quản trị viên có toàn quyền",
    active: true,
    permissions: permissionData,
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
];

const RolesTable: React.FC = () => {
  const columns: TableProps<IRole>["columns"] = [
    {
      title: "ID",
      dataIndex: "roleId",
      key: "roleId",
      width: "5%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "10%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "30%",
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      width: "15%",
      filters: [
        { text: "ACTIVE", value: true },
        { text: "INACTIVE", value: false },
      ],
      onFilter: (value, record) => record.active === value,
      render: (active: boolean) => (
        <Tag color={active ? "green" : "red"}>
          {active ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (createdAt: string) =>
        formatDate(new Date(createdAt), "dd-MM-yyyy hh:mm:ss"),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "15%",
      render: (updatedAt: string) =>
        formatDate(new Date(updatedAt), "dd-MM-yyyy hh:mm:ss"),
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      width: "10%",
      render: (record: IRole) => (
        <Space size="middle">
          <UpdateRole role={record} />
          <DeleteRole roleId={record.roleId} />
        </Space>
      ),
    },
  ];
  return (
    <Table
      rowKey={(role: IRole) => role.roleId}
      dataSource={rolesData}
      columns={columns}
      bordered
      size="middle"
    />
  );
};

export default RolesTable;
