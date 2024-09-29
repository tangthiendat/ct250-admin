import { Space, Table, TablePaginationConfig, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ALL_PERMISSIONS } from "../../../constants";
import { IAirport, Page } from "../../../interfaces";
import { formatTimestamp } from "../../../utils";
import Access from "../../auth/Access";
import DeleteAirport from "./DeleteAirport";
import UpdateAirport from "./UpdateAirport";

interface TableParams {
  pagination: TablePaginationConfig;
}

interface AirportTableProps {
  airportPage?: Page<IAirport>;
  isLoading: boolean;
}

const AirportTable: React.FC<AirportTableProps> = ({
  airportPage,
  isLoading,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} sân bay`,
    },
  }));

  useEffect(() => {
    if (airportPage) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: airportPage.meta?.total || 0,
          showTotal: (total) => `Tổng ${total} sân bay`,
        },
      }));
    }
  }, [airportPage]);

  const handleTableChange: TableProps<IAirport>["onChange"] = (
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

  const columns: TableProps<IAirport>["columns"] = [
    {
      title: "Id",
      key: "airportId",
      dataIndex: "airportId",
      width: "5%",
    },
    {
      title: "Tên sân bay",
      key: "airportName",
      dataIndex: "airportName",
      width: "20%",
    },
    {
      title: "Mã sân bay",
      key: "airportCode",
      dataIndex: "airportCode",
      width: "10%",
    },
    {
      key: "cityName",
      title: "Tên thành phố",
      dataIndex: "cityName",
      width: "15%",
    },
    {
      key: "cityCode",
      title: "Mã thành phố",
      dataIndex: "cityCode",
      width: "10%",
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

      render: (record: IAirport) => (
        <Space>
          <Access permission={ALL_PERMISSIONS.AIRPORTS.UPDATE} hideChildren>
            <UpdateAirport airport={record} />
          </Access>
          <Access permission={ALL_PERMISSIONS.USERS.DELETE} hideChildren>
            <DeleteAirport airportId={record.airportId} />
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      rowKey={(record: IAirport) => record.airportId}
      pagination={tableParams.pagination}
      dataSource={airportPage?.content || []}
      loading={{
        spinning: isLoading,
        tip: "Đang tải dữ liệu...",
      }}
      onChange={handleTableChange}
      size="small"
    />
  );
};

export default AirportTable;