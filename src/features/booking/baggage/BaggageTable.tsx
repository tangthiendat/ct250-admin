import { Space, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IBaggages, Page } from "../../../interfaces";
import { PERMISSIONS } from "../../../interfaces/common/constants";
import { Module, RouteType } from "../../../interfaces/common/enums";
import {
  formatTimestamp,
  getDefaultFilterValue,
  getDefaultSortOrder,
  getSortDirection,
} from "../../../utils";
import Access from "../../auth/Access";
import DeleteBaggage from "./DeleteBaggage";
import UpdateBaggage from "./UpdateBaggage";

interface TableParams {
  pagination: TablePaginationConfig;
}

interface BaggageTableProps {
  baggagePage?: Page<IBaggages>;
  isLoading: boolean;
}

const routeTypeTranslations: Record<RouteType, string> = {
  [RouteType.DOMESTIC]: "Nội địa",
  [RouteType.INTERNATIONAL]: "Quốc tế",
};

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
      width: "25%",
      render: (weight: number) => `${weight} Kg`,
    },
    {
      title: "Giá hành lý",
      key: "price",
      dataIndex: "price",
      width: "25%",
    },
    {
      title: "Loại chuyến bay",
      key: "routeType",
      dataIndex: "routeType",
      width: "15%",
      render: (status: IBaggages["routeType"]) => {
        let color = "";

        switch (status) {
          case RouteType.DOMESTIC:
            color = "green";
            break;
          case RouteType.INTERNATIONAL:
            color = "red";
            break;
        }

        return <Tag color={color}>{routeTypeTranslations[status]}</Tag>;
      },
      filters: Object.values(RouteType).map((routeType: string) => ({
        text: routeTypeTranslations[routeType as RouteType],
        value: routeType,
      })),
      defaultFilteredValue: getDefaultFilterValue(searchParams, "routeType"),
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
    },
    {
      title: "Hành động",
      key: "action",
      render: (record: IBaggages) => (
        <Space>
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
      bordered
      columns={columns}
      rowKey={(record: IBaggages) => record.baggageId}
      pagination={tableParams.pagination}
      dataSource={baggagePage?.content || []}
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
