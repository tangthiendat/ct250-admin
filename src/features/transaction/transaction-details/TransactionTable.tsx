import {
  CaretDownFilled,
  CaretUpFilled,
  FilterFilled,
} from "@ant-design/icons";
import { Space, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ITransaction,
  Page,
  TRANSACTION_STATUS_TRANSLATION,
  TransactionStatus,
} from "../../../interfaces";
import {
  colorFilterIcon,
  colorSortDownIcon,
  colorSortUpIcon,
  formatTimestamp,
  getDefaultFilterValue,
  getDefaultSortOrder,
  getSortDirection,
} from "../../../utils";
import ViewTransaction from "./ViewTransaction";

interface TableParams {
  pagination: TablePaginationConfig;
}

interface TransactionTableProps {
  transactionPage?: Page<ITransaction>;
  isLoading: boolean;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactionPage,
  isLoading,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} giao dịch`,
    },
  }));

  useEffect(() => {
    if (transactionPage) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: transactionPage.meta?.total || 0,
          showTotal: (total) => `Tổng ${total} giao dịch`,
        },
      }));
    }
  }, [transactionPage]);

  const handleTableChange: TableProps<ITransaction>["onChange"] = (
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

  const columns: TableProps<ITransaction>["columns"] = [
    {
      title: "ID",
      key: "transactionId",
      dataIndex: "transactionId",
      width: "3%",
    },
    {
      title: "Tên khách hàng",
      key: "passengerName",
      dataIndex: "passengerName",
      width: "10%",
    },
    {
      title: "Mã đặt vé",
      key: "bookingCode",
      dataIndex: "bookingCode",
      width: "8%",
      render: (bookingCode: string) => {
        return bookingCode || "Đang xử lý";
      },
    },
    {
      title: "Mã giao dịch",
      key: "txnRef",
      dataIndex: "txnRef",
      width: "8%",
    },
    {
      title: "Thành tiền",
      key: "amount",
      dataIndex: "amount",
      width: "8%",
      render: (amount: number) => {
        return new Intl.NumberFormat("en-US").format(amount);
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: "8%",
      render: (transactionStatus: ITransaction["status"]) => {
        let color = "";

        switch (transactionStatus) {
          case TransactionStatus.COMPLETED:
            color = "green";
            break;
          case TransactionStatus.FAILED:
            color = "red";
            break;
          case TransactionStatus.PENDING:
            color = "blue";
            break;
        }

        return (
          <Tag color={color}>
            {TRANSACTION_STATUS_TRANSLATION[transactionStatus]}
          </Tag>
        );
      },
      filters: Object.values(TransactionStatus).map(
        (transactionStatus: TransactionStatus) => ({
          text: TRANSACTION_STATUS_TRANSLATION[transactionStatus],
          value: transactionStatus,
        }),
      ),
      defaultFilteredValue: getDefaultFilterValue(searchParams, "status"),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
    {
      key: "createdAt",
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: "8%",
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
      title: "Hành động",
      key: "action",
      width: "5%",
      render: (record: ITransaction) => (
        <Space>
          <ViewTransaction transaction={record} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered={false}
      columns={columns}
      rowKey={(record: ITransaction) => record.transactionId}
      pagination={tableParams.pagination}
      dataSource={transactionPage?.content || []}
      rowClassName={(_, index) =>
        index % 2 === 0 ? "table-row-light" : "table-row-gray"
      }
      rowHoverable={false}
      loading={{
        spinning: isLoading,
        tip: "Đang tải dữ liệu...",
      }}
      onChange={handleTableChange}
      size="small"
    />
  );
};

export default TransactionTable;
