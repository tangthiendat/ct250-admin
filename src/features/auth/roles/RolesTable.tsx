import { useQuery } from "@tanstack/react-query";
import { Space, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PERMISSIONS } from "../../../common/constants";
import { IRole } from "../../../interfaces";
import { roleService } from "../../../services/auth/role-service";
import { formatTimestamp } from "../../../utils";
import Access from "../Access";
import UpdateRole from "./UpdateRole";
import ViewRole from "./ViewRole";
import { Module } from "../../../interfaces/common/enums";

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

  const pagination = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };
  const { data, isLoading } = useQuery({
    queryKey: ["roles", pagination],
    queryFn: () => roleService.getRoles(pagination),
  });

  useEffect(() => {
    if (data) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: data.payload?.meta.total,
          showTotal: (total) => `Tổng ${total} vai trò`,
        },
      }));
    }
  }, [data]);

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
        createdAt ? formatTimestamp(createdAt) : "",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "15%",
      render: (updatedAt: string) =>
        updatedAt ? formatTimestamp(updatedAt) : "",
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      width: "10%",
      render: (record: IRole) => (
        <Space size="middle">
          <ViewRole role={record} />
          <Access permission={PERMISSIONS[Module.ROLES].UPDATE} hideChildren>
            <UpdateRole role={record} />
          </Access>
          {/* <DeleteRole roleId={record.roleId} /> */}
        </Space>
      ),
    },
  ];
  return (
    <Table
      rowKey={(role: IRole) => role.roleId}
      dataSource={data?.payload?.content}
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
