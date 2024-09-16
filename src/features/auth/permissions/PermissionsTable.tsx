import { useQuery } from "@tanstack/react-query";
import { GetProp, Space, Table, TablePaginationConfig, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IPermission } from "../../../interfaces";
import { permissionsService } from "../../../services";
import {
  colorMethod,
  createSortParams,
  getDefaultSortOrder,
} from "../../../utils";
import DeletePermission from "./DeletePermission";
import UpdatePermission from "./UpdatePermission";

interface TableParams {
  pagination: TablePaginationConfig;
  sorter?: SorterResult<IPermission> | SorterResult<IPermission>[];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
  sortParams?: string;
  filterParams?: string;
}

const PermissionTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log("RENDER");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} quyền hạn`,
    },
  });

  const paginationParams = {
    page: tableParams.pagination.current || 1,
    pageSize: tableParams.pagination.pageSize || 10,
  };

  const { data, isLoading, status } = useQuery({
    queryKey: [
      "permissions",
      paginationParams,
      searchParams.get("filter") || "",
      searchParams.get("sort") || "",
    ].filter((key) => Boolean(key)),

    queryFn: () =>
      permissionsService.getPermissions(
        paginationParams,
        searchParams.get("filter") || "",
        searchParams.get("sort") || "",
      ),
  });

  useEffect(() => {
    if (status === "success") {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: data?.payload?.meta?.total || 0,
        },
      }));
    }
  }, [status, data]);

  const handleTableChange: TableProps<IPermission>["onChange"] = (
    pagination,
    filters,
    sorter,
  ) => {
    // const filterParams = createFilterParams(filters);
    const sortParams = createSortParams<IPermission>(sorter);

    setTableParams((prev) => ({
      ...prev,
      pagination,
      sorter,
      filters,
      // filterParams,
    }));

    searchParams.set("page", String(pagination.current));
    searchParams.set("pageSize", String(pagination.pageSize));
    if (sortParams) {
      searchParams.set("sort", sortParams);
    } else {
      searchParams.delete("sort");
    }
    // if (filterParams !== "()") {
    //   searchParams.set("filter", encodeURIComponent(filterParams));
    // } else {
    //   searchParams.delete("filter");
    // }
    setSearchParams(searchParams);
  };

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
    },
    {
      title: "Module",
      dataIndex: "module",
      key: "module",
      filters: [
        { text: "USERS", value: "USERS" },
        { text: "ROLES", value: "ROLES" },
        { text: "PERMISSIONS", value: "PERMISSIONS" },
      ],
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (createdAt: string) =>
        format(new Date(createdAt), "dd-MM-yyyy hh:mm:ss"),
      sorter: true,
      defaultSortOrder: getDefaultSortOrder(searchParams, "createdAt"),
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "15%",
      render: (updatedAt: string) => {
        if (updatedAt) {
          return format(new Date(updatedAt), "dd-MM-yyyy hh:mm:ss");
        }
        return "";
      },
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
      dataSource={data?.payload?.content || []}
      columns={columns}
      pagination={tableParams.pagination}
      size="middle"
      loading={{
        spinning: isLoading,
        tip: "Đang tải dữ liệu...",
      }}
      onChange={handleTableChange}
    />
  );
};

export default PermissionTable;
