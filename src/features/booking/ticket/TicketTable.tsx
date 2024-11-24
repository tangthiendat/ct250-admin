import {
  CaretDownFilled,
  CaretUpFilled,
  FilterFilled,
} from "@ant-design/icons";
import {
  Button,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import {
  ITicket,
  Module,
  Page,
  PERMISSIONS,
  TICKET_STATUS_TRANSLATION,
  TicketStatus,
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
import DeleteTicket from "./DeleteTicket";
import UpdateTicket from "./UpdateTicket";

interface TableParams {
  pagination: TablePaginationConfig;
}

interface TicketTableProps {
  ticketPage?: Page<ITicket>;
  isLoading: boolean;
}

const TicketTable: React.FC<TicketTableProps> = ({ ticketPage, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} vé`,
    },
  }));

  useEffect(() => {
    if (ticketPage) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: ticketPage.meta?.total || 0,
          showTotal: (total) => `Tổng ${total} vé`,
        },
      }));
    }
  }, [ticketPage]);

  const handleTableChange: TableProps<ITicket>["onChange"] = (
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

  const PassengerNameCell: React.FC<{
    passengerName: string;
    phoneNumber: string;
    passengerGroup: string;
  }> = ({ passengerName, phoneNumber, passengerGroup }) => {
    const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false);

    const togglePhoneNumberVisibility = () => {
      setIsPhoneNumberVisible(!isPhoneNumberVisible);
    };

    return (
      <div>
        <div className="flex items-center">
          <span>{passengerName}</span>
          <Button
            type="link"
            icon={
              isPhoneNumberVisible ? <CaretUpFilled /> : <CaretDownFilled />
            }
            onClick={togglePhoneNumberVisibility}
          />
        </div>
        {isPhoneNumberVisible && (
          <div className="text-xs text-gray-500">
            <div>Nhóm khách hàng: {passengerGroup}</div>
            <div>Số điện thoại: {phoneNumber}</div>
          </div>
        )}
      </div>
    );
  };

  const columns: TableProps<ITicket>["columns"] = [
    {
      title: "Vé",
      key: "pdfUrl",
      dataIndex: "pdfUrl",
      width: "1%",
      render: (pdfUrl: string) => {
        return (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <FaFilePdf size={24} style={{ color: "gray" }} />
          </a>
        );
      },
    },
    {
      title: "Mã vé",
      key: "ticketNumber",
      dataIndex: "ticketNumber",
      width: "3%",
    },
    {
      title: "Mã đặt chỗ",
      key: "bookingCode",
      dataIndex: "bookingCode",
      width: "3%",
    },
    {
      title: "Tên khách hàng",
      key: "passengerName",
      dataIndex: "passengerName",
      width: "6%",
      render: (passengerName: string, record: ITicket) => (
        <PassengerNameCell
          passengerName={passengerName}
          phoneNumber={record.phoneNumber}
          passengerGroup={record.passengerGroup}
        />
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: "1%",
      render: (ticketStatus: ITicket["status"]) => {
        let color = "";

        switch (ticketStatus) {
          case TicketStatus.BOOKED:
            color = "green";
            break;
          case TicketStatus.BOARDED:
            color = "blue";
            break;
          case TicketStatus.CHECKED_IN:
            color = "orange";
            break;
          case TicketStatus.NO_SHOW:
            color = "red";
            break;
          case TicketStatus.REFUNDED:
            color = "gray";
            break;
          case TicketStatus.RESCHEDULED:
            color = "purple";
            break;
        }

        return (
          <Tag color={color}>
            {TICKET_STATUS_TRANSLATION[ticketStatus as TicketStatus]}
          </Tag>
        );
      },
      filters: Object.values(TicketStatus).map(
        (ticketStatus: TicketStatus) => ({
          text: TICKET_STATUS_TRANSLATION[ticketStatus],
          value: ticketStatus,
        }),
      ),
      defaultFilteredValue: getDefaultFilterValue(searchParams, "status"),
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
      title: "Hành động",
      key: "action",
      width: "2%",
      render: (record: ITicket) => (
        <Space>
          <Access permission={PERMISSIONS[Module.TICKETS].UPDATE} hideChildren>
            <UpdateTicket ticket={record} />
          </Access>
          <Access permission={PERMISSIONS[Module.TICKETS].DELETE} hideChildren>
            <DeleteTicket ticketId={record.ticketId} />
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered={false}
      columns={columns}
      rowKey={(record: ITicket) => record.ticketId}
      pagination={tableParams.pagination}
      dataSource={ticketPage?.content || []}
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

export default TicketTable;
