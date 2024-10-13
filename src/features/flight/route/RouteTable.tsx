import { Space, Table, TablePaginationConfig, Tag } from "antd";
import { TableProps } from "antd/lib";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PERMISSIONS } from "../../../common/constants";
import { Module } from "../../../interfaces/common/enums";
import { IRoute, Page } from "../../../interfaces";
import {
  formatTimestamp,
  getDefaultSortOrder,
  getSortDirection,
} from "../../../utils";
import Access from "../../auth/Access";
import UpdateRoute from "./UpdateRoute";

interface TableParams {
  pagination: TablePaginationConfig;
}

interface RouteTableProps {
  routePage?: Page<IRoute>;
  isLoading: boolean;
}

const RouteTable: React.FC<RouteTableProps> = ({ routePage, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} máy bay`,
    },
  }));

  useEffect(() => {
    if (routePage) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: routePage.meta?.total || 0,
          showTotal: (total) => `Tổng ${total} tuyến bay`,
        },
      }));
    }
  }, [routePage]);

  const columns: TableProps<IRoute>["columns"] = [
    {
      title: "ID",
      key: "routeId",
      dataIndex: "routeId",
      width: "5%",
    },
    {
      title: "Sân bay đi",
      key: "departureAirport",
      dataIndex: "departureAirport",
      width: "27%",
      render: (departureAirport: IRoute["departureAirport"]) => (
        <>
          <Tag color="blue">{departureAirport.airportCode}</Tag>
          {departureAirport.airportName}
        </>
      ),
    },
    {
      title: "Sân bay đến",
      key: "arrivalAirport",
      dataIndex: "arrivalAirport",
      width: "27%",
      render: (arrivalAirport: IRoute["arrivalAirport"]) => (
        <>
          <Tag color="volcano">{arrivalAirport.airportCode}</Tag>
          {arrivalAirport.airportName}
        </>
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
      render: (record: IRoute) => (
        <Space>
          <Access permission={PERMISSIONS[Module.ROUTES].UPDATE} hideChildren>
            <UpdateRoute route={record} />
          </Access>
          <Access permission={PERMISSIONS[Module.ROUTES].DELETE} hideChildren>
            {/* <DeleteRoute routeId={record.routeId} /> */}
          </Access>
        </Space>
      ),
    },
  ];

  const handleTableChange: TableProps<IRoute>["onChange"] = (
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
  return (
    <Table
      bordered
      columns={columns}
      rowKey={(record: IRoute) => record.routeId}
      pagination={tableParams.pagination}
      dataSource={routePage?.content || []}
      loading={{
        spinning: isLoading,
        tip: "Đang tải dữ liệu...",
      }}
      onChange={handleTableChange}
      size="small"
    />
  );
};

export default RouteTable;
