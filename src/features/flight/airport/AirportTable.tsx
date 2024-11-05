import { Image, Space, Table, TablePaginationConfig, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { PERMISSIONS } from "../../../interfaces/common/constants";
import { IAirport, Page } from "../../../interfaces";
import {
  colorSortDownIcon,
  colorSortUpIcon,
  formatTimestamp,
  getDefaultSortOrder,
  getSortDirection,
} from "../../../utils";
import Access from "../../auth/Access";
import DeleteAirport from "./DeleteAirport";
import UpdateAirport from "./UpdateAirport";
import { Module } from "../../../interfaces/common/enums";
import ViewAirport from "./ViewAirport";

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

  const columns: TableProps<IAirport>["columns"] = [
    {
      title: "ID",
      key: "airportId",
      dataIndex: "airportId",
      width: "3%",
    },
    {
      title: "Ảnh thành phố",
      key: "imgUrl",
      dataIndex: "imgUrl",
      width: "10%",
      render: (imgUrl: string) => {
        return (
          <Image
            src={imgUrl}
            alt="airport"
            preview={Boolean(imgUrl)}
            fallback="image-placeholder.svg"
          />
        );
      },
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
      width: "13%",
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
      width: "13%",
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

      render: (record: IAirport) => (
        <Space>
          <ViewAirport airport={record} />
          <Access permission={PERMISSIONS[Module.AIRPORTS].UPDATE} hideChildren>
            <UpdateAirport airport={record} />
          </Access>
          <Access permission={PERMISSIONS[Module.AIRPORTS].DELETE} hideChildren>
            <DeleteAirport airportId={record.airportId} />
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered={false}
      columns={columns}
      rowKey={(record: IAirport) => record.airportId}
      pagination={tableParams.pagination}
      dataSource={airportPage?.content || []}
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

export default AirportTable;
