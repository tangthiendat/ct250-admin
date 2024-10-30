import { Button, Modal, Table, TableProps, Tag } from "antd";
import { useState } from "react";
import { FilterFilled } from "@ant-design/icons";
import {
  IFlightSchedule,
  ISeatAvailability,
  SeatAvailabilityStatus,
  TicketClassName,
} from "../../../interfaces";
import { colorFilterIcon, colorTicketClassName } from "../../../utils";

interface ViewSeatAvailabilityProps {
  flight: IFlightSchedule;
}

const ViewSeatAvailability: React.FC<ViewSeatAvailabilityProps> = ({
  flight,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const columns: TableProps<ISeatAvailability>["columns"] = [
    {
      title: "ID",
      dataIndex: "seat",
      key: "seatId",
      render: (seat: ISeatAvailability["seat"]) => <span>{seat.seatId}</span>,
    },
    {
      title: "Mã chỗ ngồi",
      dataIndex: "seat",
      key: "seatCode",
      render: (seat: ISeatAvailability["seat"]) => <span>{seat.seatCode}</span>,
    },
    {
      title: "Hạng ghế",
      dataIndex: "seat",
      key: "ticketClass",
      render: (seat: ISeatAvailability["seat"]) => (
        <span
          style={{
            color: colorTicketClassName(seat.ticketClass),
            fontWeight: 600,
          }}
        >
          {seat.ticketClass}
        </span>
      ),
      filters: Object.values(TicketClassName).map((ticketClass) => ({
        text: ticketClass,
        value: ticketClass,
      })),
      onFilter: (value, record) => record.seat.ticketClass === value,
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: ISeatAvailability["status"]) => {
        let color = "";
        switch (status) {
          case SeatAvailabilityStatus.AVAILABLE:
            color = "green";
            break;
          case SeatAvailabilityStatus.BLOCKED:
            color = "red";
            break;
          case SeatAvailabilityStatus.BOOKED:
            color = "yellow";
            break;
        }
        return <Tag color={color}>{status}</Tag>;
      },
      filters: Object.values(SeatAvailabilityStatus).map((status) => ({
        text: status,
        value: status,
      })),
      onFilter: (value, record) => record.status === value,
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Xem chỗ ngồi
      </Button>
      <Modal
        open={isOpenModal}
        width="50%"
        title={
          <span className="text-lg">
            Thông tin chỗ ngồi của chuyến bay {flight.flightId}
          </span>
        }
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <Table
          rowKey={(record) => record.seatAvailabilityId}
          columns={columns}
          dataSource={flight.seatAvailability}
          pagination={{
            showTotal: (total) => `Tổng ${total} chỗ ngồi`,
          }}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-gray"
          }
          rowHoverable={false}
          size="small"
        />
      </Modal>
    </div>
  );
};

export default ViewSeatAvailability;
