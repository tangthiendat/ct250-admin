import { useQuery } from "@tanstack/react-query";
import { Table, TablePaginationConfig, TableProps } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IAirport } from "../../../interfaces";
import { airportService } from "../../../services/airport-service";
import { formatTimestamp } from "../../../utils";

interface TableParams {
  pagination: TablePaginationConfig;
}

const AirportTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} sân bay`,
    },
  }));

  const pagination = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["airports", pagination],
    queryFn: () => airportService.getAirports(pagination),
  });

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
      title: "Tên sân bay",
      key: "airportName",
      dataIndex: "airportName",
      width: "25%",
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
      width: "10%",
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
      width: "10%",
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

      // render: (record: IAirport) => (
      //   <Space>
      //     <ViewUser user={record} />
      //     <Access permission={ALL_PERMISSIONS.USERS.UPDATE} hideChildren>
      //       <UpdateUser user={record} />
      //     </Access>
      //     <Access permission={ALL_PERMISSIONS.USERS.DELETE} hideChildren>
      //       <DeleteUser userId={record.userId} />
      //     </Access>
      //   </Space>
      // ),
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={(record: IAirport) => record.airportId}
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

export default AirportTable;
