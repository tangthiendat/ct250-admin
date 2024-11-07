import { useQuery } from "@tanstack/react-query";
import { Space, Table, TablePaginationConfig } from "antd";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { feeService } from "../../../services";
import { TableProps } from "antd/lib";
import { IFee, Module, PERMISSIONS, SortParams } from "../../../interfaces";
import {
  colorSortDownIcon,
  colorSortUpIcon,
  formatTimestamp,
  getDefaultSortOrder,
  getSortDirection,
} from "../../../utils";
import Access from "../../auth/Access";
import UpdateFee from "./UpdateFee";
import ViewFee from "./ViewFee";

interface TableParams {
  pagination: TablePaginationConfig;
}

const FeesTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} khoản phí`,
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
    queryKey: ["fees", pagination, sort].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => feeService.getFees(pagination, sort),
  });

  useEffect(() => {
    if (data) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: data.payload?.meta.total,
          showTotal: (total) => `Tổng ${total} phí`,
        },
      }));
    }
  }, [data]);

  const handleTableChange: TableProps<IFee>["onChange"] = (
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

  const columns: TableProps<IFee>["columns"] = [
    {
      title: "ID",
      dataIndex: "feeId",
      key: "feeId",
      width: "5%",
    },
    {
      title: "Tên phí",
      dataIndex: "feeName",
      key: "feeName",
      width: "20%",
    },
    {
      title: "Nhóm phí",
      dataIndex: "feeGroup",
      key: "feeGroup",
      width: "30%",
      render: (feeGroup: IFee["feeGroup"]) => feeGroup?.feeGroupName,
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
      render: (record: IFee) => (
        <Space>
          <Access permission={PERMISSIONS[Module.FEES].GET_BY_ID} hideChildren>
            <ViewFee fee={record} />
          </Access>
          <Access permission={PERMISSIONS[Module.FEES].UPDATE} hideChildren>
            <UpdateFee fee={record} />
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey={(role: IFee) => role.feeId}
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

export default FeesTable;
