import { DeleteOutlined } from "@ant-design/icons";
import { Space, Table, TableProps } from "antd";
import { formatDate } from "date-fns";
import { IPermission } from "../../interfaces";
import { colorMethod } from "../../utils";
import UpdatePermission from "./UpdatePermission";

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
          <DeleteOutlined className="text-xl text-[#ff4d4f]" />
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
