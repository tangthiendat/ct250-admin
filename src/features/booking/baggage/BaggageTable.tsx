import { Space, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FilterFilled,
  CaretUpFilled,
  CaretDownFilled,
} from "@ant-design/icons";
import { IBaggages, Page } from "../../../interfaces";
import { PERMISSIONS, ROUTE_TYPE_TRANSLATION } from "../../../interfaces";
import { Module, RouteType } from "../../../interfaces/common/enums";
import {
  colorFilterIcon,
  colorSortDownIcon,
  colorSortUpIcon,
  formatTimestamp,
  getDefaultFilterValue,
  getDefaultSortOrder,
  getSortDirection,
  isInDateRange,
} from "../../../utils";
import Access from "../../auth/Access";
import DeleteBaggage from "./DeleteBaggage";
import UpdateBaggage from "./UpdateBaggage";
import ViewBaggage from "./ViewBaggage";
import dayjs from "dayjs";

interface TableParams {
  pagination: TablePaginationConfig;
}

interface BaggageTableProps {
  baggagePage?: Page<IBaggages>;
  isLoading: boolean;
}

const BaggageTable: React.FC<BaggageTableProps> = ({
  baggagePage,
  isLoading,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} loại hành lý`,
    },
  }));

  useEffect(() => {
    if (baggagePage) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: baggagePage.meta?.total || 0,
          showTotal: (total) => `Tổng ${total} loại hành lý`,
        },
      }));
    }
  }, [baggagePage]);

  const handleTableChange: TableProps<IBaggages>["onChange"] = (
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

  const columns: TableProps<IBaggages>["columns"] = [
    {
      title: "Id",
      key: "baggageId",
      dataIndex: "baggageId",
      width: "5%",
    },
    {
      title: "Cân nặng hành lý",
      key: "baggageWeight",
      dataIndex: "baggageWeight",
      width: "20%",
      render: (weight: number) => `${weight} Kg`,
    },
    {
      title: "Giá hiện hành",
      key: "currentPrice",
      dataIndex: "baggagePricing",
      width: "20%",
      render: (baggagePricing: IBaggages["baggagePricing"]) => {
        const currentPrice = baggagePricing.find((pricing) =>
          isInDateRange(
            dayjs().tz().format("YYYY-MM-DD"),
            pricing.validFrom,
            pricing.validTo,
          ),
        );
        return currentPrice?.price.toLocaleString();
      },
    },
    {
      title: "Loại chuyến bay",
      key: "routeType",
      dataIndex: "routeType",
      width: "15%",
      render: (routeType: IBaggages["routeType"]) => {
        let color = "";

        switch (routeType) {
          case RouteType.DOMESTIC:
            color = "green";
            break;
          case RouteType.INTERNATIONAL:
            color = "red";
            break;
        }

        return <Tag color={color}>{ROUTE_TYPE_TRANSLATION[routeType]}</Tag>;
      },
      filters: Object.values(RouteType).map((routeType: string) => ({
        text: ROUTE_TYPE_TRANSLATION[routeType as RouteType],
        value: routeType,
      })),
      defaultFilteredValue: getDefaultFilterValue(searchParams, "routeType"),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
    {
      key: "createdAt",
      title: "Ngày tạo",
      dataIndex: "createdAt",
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
      key: "updatedAt",
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
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
      render: (record: IBaggages) => (
        <Space>
          <ViewBaggage baggage={record} />
          <Access permission={PERMISSIONS[Module.BAGGAGES].UPDATE} hideChildren>
            <UpdateBaggage baggage={record} />
          </Access>
          <Access permission={PERMISSIONS[Module.BAGGAGES].DELETE} hideChildren>
            <DeleteBaggage baggageId={record.baggageId} />
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered={false}
      columns={columns}
      rowKey={(record: IBaggages) => record.baggageId}
      pagination={tableParams.pagination}
      dataSource={baggagePage?.content || []}
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

export default BaggageTable;
