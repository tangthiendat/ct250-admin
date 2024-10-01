import { useQuery } from "@tanstack/react-query";
import { GetProp, Space, Table, TablePaginationConfig, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ALL_METHODS, ALL_MODULES, ALL_PERMISSIONS } from "../../../constants";
import { IPermission, PaginationParams } from "../../../interfaces";
import { permissionsService } from "../../../services";
import {
  colorMethod,
  formatTimestamp,
  getDefaultFilterValue,
  getDefaultSortOrder,
  getDirection,
} from "../../../utils";
import Access from "../Access";
import UpdatePermission from "./UpdatePermission";

interface TableParams {
  pagination: TablePaginationConfig;
  sorter?: SorterResult<IPermission> | SorterResult<IPermission>[];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const PermissionTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} quyền hạn`,
    },
  }));

  const pagination: PaginationParams = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      "permissions",
      pagination,
      {
        method: searchParams.get("method") || undefined,
        module: searchParams.get("module") || undefined,
      },
      {
        sortBy: searchParams.get("sortBy") || "",
        direction: searchParams.get("direction") || "",
      },
    ].filter((key) => Boolean(key)),

    queryFn: () =>
      permissionsService.getPermissions(
        pagination,
        {
          method: searchParams.get("method") || undefined,
          module: searchParams.get("module") || undefined,
        },
        {
          sortBy: searchParams.get("sortBy") || "",
          direction: searchParams.get("direction") || "",
        },
      ),
  });

  useEffect(() => {
    if (data) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: data?.payload?.meta?.total || 0,
          showTotal: (total) => `Tổng ${total} quyền hạn`,
        },
      }));
    }
  }, [data]);

  const handleTableChange: TableProps<IPermission>["onChange"] = (
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

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          searchParams.set(key, value.join(","));
        } else {
          if (value) {
            searchParams.set(key, `${value}`);
          } else {
            searchParams.delete(key);
          }
        }
      });
    }

    let sortBy;
    let direction;

    if (sorter) {
      if (Array.isArray(sorter)) {
        sortBy = sorter[0].field as string;
        direction = getDirection(sorter[0].order as string);
      } else {
        sortBy = sorter.field as string;
        direction = getDirection(sorter.order as string);
      }
    }

    if (sortBy && direction) {
      searchParams.set("sortBy", sortBy);
      searchParams.set("direction", direction);
    } else {
      searchParams.delete("direction");
      searchParams.delete("sortBy");
    }

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
      filters: ALL_METHODS.map((method: string) => ({
        text: method,
        value: method,
      })),
      defaultFilteredValue: getDefaultFilterValue(searchParams, "method"),
    },
    {
      title: "Module",
      dataIndex: "module",
      key: "module",
      filters: ALL_MODULES.map((module: string) => ({
        text: module,
        value: module,
      })),
      defaultFilteredValue: getDefaultFilterValue(searchParams, "module"),
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (createdAt: string) =>
        createdAt ? formatTimestamp(createdAt) : "",
      sorter: true,
      defaultSortOrder: getDefaultSortOrder(searchParams, "createdAt"),
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "15%",
      render: (updatedAt: string) =>
        updatedAt ? formatTimestamp(updatedAt) : "",
      sorter: true,
      defaultSortOrder: getDefaultSortOrder(searchParams, "updatedAt"),
    },
    {
      title: "Hành động",
      key: "action",
      width: "10%",
      align: "center",
      render: (record: IPermission) => (
        <Space size="middle">
          <Access permission={ALL_PERMISSIONS.PERMISSIONS.UPDATE} hideChildren>
            <UpdatePermission permission={record} />
          </Access>
          {/* <DeletePermission permissionId={record.permissionId} />O */}
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
