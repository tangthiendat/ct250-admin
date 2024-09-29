import { useQuery } from "@tanstack/react-query";
import { Space, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ALL_PERMISSIONS } from "../../../constants";
import { IUser } from "../../../interfaces";
import { userService } from "../../../services/user-service";
import { formatTimestamp } from "../../../utils";
import Access from "../Access";
import UpdateUser from "./UpdateUser";
import ViewUser from "./ViewUser";

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
      showTotal: (total) => `Tổng ${total} người dùng`,
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
      title: "Họ",
      key: "lastName",
      dataIndex: "lastName",
      width: "10%",
    },
    {
      title: "Tên đệm và tên",
      key: "firstName",
      dataIndex: "firstName",
      width: "15%",
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
        createdAt ? formatTimestamp(createdAt) : "",
    },
    {
      key: "updatedAt",
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      width: "15%",
      render: (updatedAt: string) =>
        updatedAt ? formatTimestamp(updatedAt) : "",
    },
    {
      title: "Hành động",
      key: "action",

      render: (record: IUser) => (
        <Space>
          <ViewUser user={record} />
          <Access permission={ALL_PERMISSIONS.USERS.UPDATE} hideChildren>
            <UpdateUser user={record} />
          </Access>
          {/* <Access permission={ALL_PERMISSIONS.USERS.DELETE} hideChildren>
            <DeleteUser userId={record.userId} />
          </Access> */}
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered
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
