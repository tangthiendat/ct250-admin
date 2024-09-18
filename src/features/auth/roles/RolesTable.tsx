import { Space, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { formatDate } from "date-fns";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IRole } from "../../../interfaces";
import { useRolesPage } from "../hooks/useRolesPage";
import DeleteRole from "./DeleteRole";
import UpdateRole from "./UpdateRole";

interface TableParams {
  pagination: TablePaginationConfig;
}

const RolesTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} vai trò`,
    },
  }));
  const { rolesPage, isLoading } = useRolesPage();

  useEffect(() => {
    if (rolesPage) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: rolesPage.meta.total,
          showTotal: (total) => `Tổng ${total} vai trò`,
        },
      }));
    }
  }, [rolesPage]);

  const handleTableChange: TableProps<IRole>["onChange"] = (
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

  const columns: TableProps<IRole>["columns"] = [
    {
      title: "ID",
      dataIndex: "roleId",
      key: "roleId",
      width: "5%",
    },
    {
      title: "Tên",
      dataIndex: "roleName",
      key: "roleName",
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
        updatedAt ? formatDate(new Date(updatedAt), "dd-MM-yyyy hh:mm:ss") : "",
      sorter: (a, b) => {
        if (a.updatedAt && b.updatedAt) {
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        }
        return 0;
      },
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
      dataSource={rolesPage?.content}
      columns={columns}
      pagination={tableParams.pagination}
      bordered
      size="middle"
      loading={{
        spinning: isLoading,
        tip: "Đang tải dữ liệu...",
      }}
      onChange={handleTableChange}
    />
  );
};

export default RolesTable;
