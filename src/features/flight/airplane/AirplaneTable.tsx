import { Space, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { volcano, blue } from "@ant-design/colors";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PERMISSIONS } from "../../../common/constants";
import { IAirplane, Page } from "../../../interfaces";
import {
  formatTimestamp,
  getDefaultFilterValue,
  getDefaultSortOrder,
  getSortDirection,
} from "../../../utils";
import Access from "../../auth/Access";
import DeleteAirplane from "./DeleteAirplane";
import UpdateAirplane from "./UpdateAirplane";
import ViewAirplane from "./ViewAirplane";
import { AirplaneStatus, Module } from "../../../common/enums";

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
      sorter: true,
      defaultSortOrder: getDefaultSortOrder(searchParams, "numberOfSeats"),
    },
    // {
    //   title: "Tình trạng sử dụng",
    //   key: "inUse",
    //   dataIndex: "inUse",
    //   width: "15%",
    //   render: (inUse: boolean) => {
    //     const color = inUse ? blue[6] : volcano[6];
    //     const text = inUse ? "Đang sử dụng" : "Không sử dụng";
    //     return (
    //       <p
    //         style={{
    //           color: color,
    //           fontWeight: 600,
    //         }}
    //       >
    //         {text}
    //       </p>
    //     );
    //   },
    //   filters: [
    //     {
    //       text: "Đang sử dụng",
    //       value: true,
    //     },
    //     {
    //       text: "Không sử dụng",
    //       value: false,
    //     },
    //   ],
    //   defaultFilteredValue: getDefaultFilterValue(searchParams, "inUse"),
    // },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: "13%",
      render: (status: IAirplane["status"]) => {
        let color = "";

        switch (status) {
          case AirplaneStatus.ACTIVE:
            color = "green";
            break;
          case AirplaneStatus.MAINTENANCE:
            color = "orange";
            break;
          case AirplaneStatus.RETIRED:
            color = "red";
            break;
        }

        return <Tag color={color}>{status}</Tag>;
      },
      filters: Object.values(AirplaneStatus).map((status: string) => ({
        text: status,
        value: status,
      })),
      defaultFilteredValue: getDefaultFilterValue(searchParams, "status"),
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

      render: (record: IAirplane) => (
        <Space>
          <ViewAirplane airplane={record} />
          <Access
            permission={PERMISSIONS[Module.AIRPLANES].UPDATE}
            hideChildren
          >
            <UpdateAirplane airplane={record} />
          </Access>
          <Access
            permission={PERMISSIONS[Module.AIRPLANES].DELETE}
            hideChildren
          >
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
