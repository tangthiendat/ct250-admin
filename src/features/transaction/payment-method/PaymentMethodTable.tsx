import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Space, Table, TablePaginationConfig, Tag } from "antd";
import { TableProps } from "antd/lib";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  IPaymentMethod,
  Module,
  PERMISSIONS,
  SortParams,
} from "../../../interfaces";
import { paymentMethodService } from "../../../services/transaction/payment-method-service";
import {
  colorSortDownIcon,
  colorSortUpIcon,
  formatTimestamp,
  getDefaultSortOrder,
  getSortDirection,
} from "../../../utils";
import Access from "../../auth/Access";
import DeletePaymentMethod from "./DeletePaymentMethod";
import UpdatePaymentMethod from "./UpdatePaymentMethod";

interface TableParams {
  pagination: TablePaginationConfig;
}

const PaymentMethodsTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} số phương thức thanh toán`,
    },
  }));

  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "",
    direction: searchParams.get("direction") || "",
  };

  const pagination = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["payment-methods", pagination, sort],
    queryFn: () => paymentMethodService.getPaymentMethods(pagination, sort),
  });

  useEffect(() => {
    if (data) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: data.payload?.meta.total,
          showTotal: (total) => `Tổng ${total} số phương thức thanh toán`,
        },
      }));
    }
  }, [data]);

  const handleTableChange: TableProps<IPaymentMethod>["onChange"] = (
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

    let sortBy;
    let direction;

    if (sorter) {
      if (Array.isArray(sorter)) {
        sortBy = sorter[0].field as string;
        direction = getSortDirection(sorter[0].order as string);
      } else {
        sortBy = sorter.field as string;
        direction = getSortDirection(sorter.order as string);
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

  const columns: TableProps<IPaymentMethod>["columns"] = [
    {
      title: "ID",
      dataIndex: "paymentMethodId",
      key: "paymentMethodId",
      width: "5%",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethodName",
      key: "paymentMethodName",
      width: "20%",
      render: (paymentMethodName: string) => {
        const colors = [
          "magenta",
          "red",
          "volcano",
          "orange",
          "gold",
          "lime",
          "green",
          "cyan",
          "blue",
          "geekblue",
          "purple",
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return <Tag color={color}>{paymentMethodName}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (createdAt: string) =>
        createdAt ? formatTimestamp(createdAt) : "",
      sorter: true,
      defaultSortOrder: getDefaultSortOrder(searchParams, "createdAt"),
      sortIcon: ({ sortOrder }) => (
        <div className="flex flex-col text-[10px]">
          <CaretUpFilled style={{ color: colorSortUpIcon(sortOrder) }} />
          <CaretDownFilled style={{ color: colorSortDownIcon(sortOrder) }} />
        </div>
      ),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "15%",
      render: (updatedAt: string) =>
        updatedAt ? formatTimestamp(updatedAt) : "",
      sorter: true,
      defaultSortOrder: getDefaultSortOrder(searchParams, "updatedAt"),
      sortIcon: ({ sortOrder }) => (
        <div className="flex flex-col text-[10px]">
          <CaretUpFilled style={{ color: colorSortUpIcon(sortOrder) }} />
          <CaretDownFilled style={{ color: colorSortDownIcon(sortOrder) }} />
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: "12%",
      render: (record: IPaymentMethod) => (
        <Space>
          <Access
            permission={PERMISSIONS[Module.PAYMENT_METHODS].UPDATE}
            hideChildren
          >
            <UpdatePaymentMethod paymentMethod={record} />
          </Access>
          <Access
            permission={PERMISSIONS[Module.PAYMENT_METHODS].DELETE}
            hideChildren
          >
            <DeletePaymentMethod paymentMethodId={record.paymentMethodId} />
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey={(record: IPaymentMethod) => record.paymentMethodId}
      dataSource={data?.payload?.content}
      columns={columns}
      pagination={tableParams.pagination}
      bordered={false}
      size="small"
      rowClassName={(_, index) =>
        index % 2 === 0 ? "table-row-light" : "table-row-gray"
      }
      rowHoverable={false}
      loading={{
        spinning: isLoading,
        tip: "Đang tải dữ liệu...",
      }}
      onChange={handleTableChange}
    />
  );
};

export default PaymentMethodsTable;
