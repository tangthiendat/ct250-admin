import { Table, TableProps, Tag } from "antd";
import { IPermission, IRole } from "../../../interfaces";
import { formatDate } from "date-fns";

const permissionData: IPermission[] = [
  {
    permissionId: 1,
    name: "Create Flight",
    apiPath: "/api/v1/flights",
    method: "POST",
    module: "FLIGHT",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 2,
    name: "Read Flight",
    apiPath: "/api/v1/flights",
    method: "GET",
    module: "FLIGHT",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 3,
    name: "Update Flight",
    apiPath: "/api/v1/flights/{id}",
    method: "PUT",
    module: "FLIGHT",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 4,
    name: "Delete Flight",
    apiPath: "/api/v1/flights/{id}",
    method: "DELETE",
    module: "FLIGHT",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 5,
    name: "Create Booking",
    apiPath: "/api/v1/bookings",
    method: "POST",
    module: "BOOKING",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 6,
    name: "Read Booking",
    apiPath: "/api/v1/bookings",
    method: "GET",
    module: "BOOKING",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 7,
    name: "Update Booking",
    apiPath: "/api/v1/bookings/{id}",
    method: "PUT",
    module: "BOOKING",
    createdAt: "2021-09-02",
    updatedAt: "2021-09-02",
  },
  {
    permissionId: 8,
    name: "Delete Booking",
    apiPath: "/api/v1/bookings/{id}",
    method: "DELETE",
    module: "BOOKING",
    createdAt: "2021-09-02",
    updatedAt: "2021-09-02",
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
