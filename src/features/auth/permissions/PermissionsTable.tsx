import { Space, Table, TableProps } from "antd";
import { formatDate } from "date-fns";
import { IPermission } from "../../../interfaces";
import { colorMethod } from "../../../utils";
import DeletePermission from "./DeletePermission";
import UpdatePermission from "./UpdatePermission";

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
    name: "Read users",
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
    name: "Read roles",
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
    name: "Read permissions",
    apiPath: "/api/v1/permissions",
    method: "GET",
    module: "PERMISSIONS",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 11,
    name: "Update permissions",
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

const PermissionTable: React.FC = () => {
  const columns: TableProps<IPermission>["columns"] = [
    {
      title: "ID",
      dataIndex: "permissionId",
      key: "permissionId",
      width: "5%",
    },
    {
      title: "Tên quyền hạn",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "API",
      dataIndex: "apiPath",
      key: "apiPath",
    },
    {
      title: "Phương thức",
      dataIndex: "method",
      key: "method",
      width: "12%",
      render(method: IPermission["method"]) {
        return (
          <p
            style={{
              fontWeight: "bold",
              color: colorMethod(method),
            }}
          >
            {method}
          </p>
        );
      },
      filters: [
        { text: "GET", value: "GET" },
        { text: "POST", value: "POST" },
        { text: "PUT", value: "PUT" },
        { text: "DELETE", value: "DELETE" },
      ],
      onFilter: (value, record) => record.method === value,
    },
    {
      title: "Module",
      dataIndex: "module",
      key: "module",
      filters: [
        { text: "FLIGHT", value: "FLIGHT" },
        { text: "BOOKING", value: "BOOKING" },
      ],
      onFilter: (value, record) => record.module === value,
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (createdAt: string) =>
        formatDate(new Date(createdAt), "dd-MM-yyyy hh:mm:ss"),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Thời gian cập nhật",
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
      width: "10%",
      align: "center",
      render: (record: IPermission) => (
        <Space size="middle">
          <UpdatePermission permission={record} />
          <DeletePermission permissionId={record.permissionId} />
        </Space>
      ),
    },
  ];
  return (
    <Table
      bordered
      rowKey={(record: IPermission) => record.permissionId}
      dataSource={permissionData}
      columns={columns}
      size="middle"
    />
  );
};

export default PermissionTable;
