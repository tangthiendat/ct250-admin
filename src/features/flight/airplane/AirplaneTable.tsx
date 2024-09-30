import { Space, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ALL_PERMISSIONS } from "../../../constants";
import { IAirplane, Page } from "../../../interfaces";
import { formatTimestamp } from "../../../utils";
import Access from "../../auth/Access";
import DeleteAirplane from "./DeleteAirplane";
import UpdateAirplane from "./UpdateAirplane";
import ViewAirplane from "./ViewAirplane";

interface TableParams {
  pagination: TablePaginationConfig;
}

interface AirplaneTableProps {
  airplanePage?: Page<IAirplane>;
  isLoading: boolean;
}

const AirplaneTable: React.FC<AirplaneTableProps> = ({
  airplanePage,
  isLoading,
}) => {
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
    if (airplanePage) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: airplanePage.meta?.total || 0,
          showTotal: (total) => `Tổng ${total} máy bay`,
        },
      }));
    }
  }, [airplanePage]);

  const handleTableChange: TableProps<IAirplane>["onChange"] = (
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

  const columns: TableProps<IAirplane>["columns"] = [
    {
      title: "Id",
      key: "airplaneId",
      dataIndex: "airplaneId",
      width: "5%",
    },
    {
      title: "Mô hình máy bay",
      key: "modelName",
      dataIndex: "modelName",
      width: "20%",
    },
    {
      title: "Tổng số ghế",
      key: "numberOfSeats",
      dataIndex: "numberOfSeats",
      width: "10%",
    },
    {
      title: "Tình trạng sử dụng",
      key: "inUse",
      dataIndex: "inUse",
      width: "15%",
      render: (inUse: boolean) => (
        <Tag color={inUse ? "green" : "red"}>
          {inUse ? "IN USE" : "NOT IN USE"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: "13%",
      render: (status: string) => {
        let color = "";
        let text = "";

        switch (status) {
          case "active":
            color = "blue";
            text = "READY";
            break;
          case "maintenance":
            color = "gold";
            text = "MAINTENANCE";
            break;
          case "retired":
            color = "red";
            text = "RETIRED";
            break;
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },

    {
      key: "updatedAt",
      title: "Ngày tạo",
      dataIndex: "updatedAt",
      width: "15%",
      render: (updatedAt: string) =>
        updatedAt ? formatTimestamp(updatedAt) : "",
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

      render: (record: IAirplane) => (
        <Space>
          <ViewAirplane airplane={record} />
          <Access permission={ALL_PERMISSIONS.AIRPLANES.UPDATE} hideChildren>
            <UpdateAirplane airplane={record} />
          </Access>
          <Access permission={ALL_PERMISSIONS.AIRPLANES.DELETE} hideChildren>
            <DeleteAirplane airplaneId={record.airplaneId} />
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      rowKey={(record: IAirplane) => record.airplaneId}
      pagination={tableParams.pagination}
      dataSource={airplanePage?.content || []}
      loading={{
        spinning: isLoading,
        tip: "Đang tải dữ liệu...",
      }}
      onChange={handleTableChange}
      size="small"
    />
  );
};

export default AirplaneTable;
