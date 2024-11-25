import {
  CaretDownFilled,
  CaretUpFilled,
  FilterFilled,
} from "@ant-design/icons";
import { Space, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  BOOKING_STATUS_TRANSLATION,
  BookingStatus,
  IBooking,
  Module,
  Page,
  PERMISSIONS,
  TRIP_TYPE_TRANSLATION,
  TripType,
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
import Access from "../../auth/Access";

interface TableParams {
  pagination: TablePaginationConfig;
}

interface BookingTableProps {
  bookingPage?: Page<IBooking>;
  isLoading: boolean;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookingPage,
  isLoading,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} đặt chỗ`,
    },
  }));

  useEffect(() => {
    if (bookingPage) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: bookingPage.meta?.total || 0,
          showTotal: (total) => `Tổng ${total} đặt chỗ`,
        },
      }));
    }
  }, [bookingPage]);

  const handleTableChange: TableProps<IBooking>["onChange"] = (
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

  const columns: TableProps<IBooking>["columns"] = [
    {
      title: "Mã đặt chỗ",
      key: "bookingCode",
      dataIndex: "bookingCode",
      width: "3%",
      render: (bookingCode: string | null) => bookingCode || "Đang cập nhật",
    },
    {
      title: "Tổng khách",
      key: "totalPassengers",
      dataIndex: "bookingFlights",
      width: "3%",
      render: (bookingFlights: IBooking["bookingFlights"]) => {
        const totalPassengers =
          bookingFlights[0]?.bookingPassengers.length || 0;
        return totalPassengers;
      },
    },

    {
      title: "Tổng tiền",
      key: "totalPrice",
      dataIndex: "totalPrice",
      width: "3%",
      render(totalPrice: number) {
        return totalPrice.toLocaleString();
      },
    },
    {
      title: "Chuyến bay",
      key: "tripType",
      dataIndex: "tripType",
      width: "3%",
      render: (tripType: IBooking["tripType"]) => {
        let color = "";
        switch (tripType) {
          case TripType.ONE_WAY:
            color = "green";
            break;
          case TripType.ROUND_TRIP:
            color = "blue";
            break;
          case TripType.MULTI_CITY:
            color = "orange";
            break;
        }
        return (
          <Tag color={color}>{TRIP_TYPE_TRANSLATION[tripType as TripType]}</Tag>
        );
      },
      filters: Object.values(TripType).map((tripType: TripType) => ({
        text: TRIP_TYPE_TRANSLATION[tripType],
        value: tripType,
      })),
      defaultFilteredValue: getDefaultFilterValue(searchParams, "tripType"),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
    {
      title: "Trạng thái",
      key: "bookingStatus",
      dataIndex: "bookingStatus",
      width: "2%",
      render: (bookingStatus: IBooking["bookingStatus"]) => {
        let color = "";

        switch (bookingStatus) {
          case BookingStatus.INIT:
            color = "blue";
            break;
          case BookingStatus.CANCELLED:
            color = "red";
            break;
          case BookingStatus.PENDING:
            color = "orange";
            break;
          case BookingStatus.RESERVED:
            color = "yellow";
            break;
          case BookingStatus.PAID:
            color = "brown";
            break;
        }

        return (
          <Tag color={color}>
            {BOOKING_STATUS_TRANSLATION[bookingStatus as BookingStatus]}
          </Tag>
        );
      },
      filters: Object.values(BookingStatus).map(
        (bookingStatus: BookingStatus) => ({
          text: BOOKING_STATUS_TRANSLATION[bookingStatus],
          value: bookingStatus,
        }),
      ),
      defaultFilteredValue: getDefaultFilterValue(
        searchParams,
        "bookingStatus",
      ),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
    {
      key: "createdAt",
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: "5%",
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
      width: "5%",
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
      title: "Chi tiết",
      key: "action",
      width: "1%",
      render: (record: IBooking) => (
        <Space>
          {
            <Access
              permission={PERMISSIONS[Module.BOOKINGS].GET_BY_ID}
              hideChildren={false}
            >
              <div className="flex items-center justify-end px-5">
                <FaArrowRightToBracket
                  onClick={() => navigate(`${record.bookingId}`)}
                  size={20}
                />
              </div>
            </Access>
          }
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered={false}
      columns={columns}
      rowKey={(record: IBooking) => record.bookingId}
      pagination={tableParams.pagination}
      dataSource={bookingPage?.content || []}
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

export default BookingTable;
