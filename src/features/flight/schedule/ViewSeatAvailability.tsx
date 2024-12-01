// import { FilterFilled } from "@ant-design/icons";
// import { Button, Modal, Table, TableProps, Tag } from "antd";
// import { useState } from "react";
// import {
//   IFlightSchedule,
//   ISeatAvailability,
//   SeatAvailabilityStatus,
//   TicketClassName,
// } from "../../../interfaces";
// import { colorFilterIcon, colorTicketClassName } from "../../../utils";

// interface ViewSeatAvailabilityProps {
//   flight: IFlightSchedule;
// }

// const ViewSeatAvailability: React.FC<ViewSeatAvailabilityProps> = ({
//   flight,
// }) => {
//   const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

//   const handleOpenModal = () => {
//     setIsOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setIsOpenModal(false);
//   };

//   const columns: TableProps<ISeatAvailability>["columns"] = [
//     {
//       title: "ID",
//       dataIndex: "seat",
//       key: "seatId",
//       render: (seat: ISeatAvailability["seat"]) => <span>{seat.seatId}</span>,
//     },
//     {
//       title: "Mã chỗ ngồi", // no-spellcheck
//       dataIndex: "seat",
//       key: "seatCode",
//       render: (seat: ISeatAvailability["seat"]) => <span>{seat.seatCode}</span>,
//     },
//     {
//       title: "Hạng ghế", // no-spellcheck
//       dataIndex: "seat",
//       key: "ticketClass",
//       render: (seat: ISeatAvailability["seat"]) => (
//         <span
//           style={{
//             color: colorTicketClassName(seat.ticketClass),
//             fontWeight: 600,
//           }}
//         >
//           {seat.ticketClass}
//         </span>
//       ),
//       filters: Object.values(TicketClassName).map((ticketClass) => ({
//         text: ticketClass,
//         value: ticketClass,
//       })),
//       onFilter: (value, record) => record.seat.ticketClass === value,
//       filterIcon: (filtered) => (
//         <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
//       ),
//     },
//     {
//       title: "Trạng thái", // no-spellcheck
//       dataIndex: "status",
//       key: "status",
//       render: (status: ISeatAvailability["status"]) => {
//         let color = "";
//         switch (status) {
//           case SeatAvailabilityStatus.AVAILABLE:
//             color = "green";
//             break;
//           case SeatAvailabilityStatus.BLOCKED:
//             color = "red";
//             break;
//           case SeatAvailabilityStatus.BOOKED:
//             color = "yellow";
//             break;
//         }
//         return <Tag color={color}>{status}</Tag>;
//       },
//       filters: Object.values(SeatAvailabilityStatus).map((status) => ({
//         text: status,
//         value: status,
//       })),
//       onFilter: (value, record) => record.status === value,
//       filterIcon: (filtered) => (
//         <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Button type="primary" onClick={handleOpenModal}>
//         Xem chỗ ngồi // no-spellcheck
//       </Button>
//       <Modal
//         open={isOpenModal}
//         width="50%"
//         title={
//           <span className="text-lg">
//             Thông tin chỗ ngồi của chuyến bay {flight.flightId} // no-spellcheck
//           </span>
//         }
//         destroyOnClose
//         onCancel={handleCloseModal}
//         footer={null}
//       >
//         <Table
//           rowKey={(record) => record.seatAvailabilityId}
//           columns={columns}
//           dataSource={flight.seatAvailability}
//           pagination={{
//             showTotal: (total) => `Tổng ${total} chỗ ngồi`, // no-spellcheck
//           }}
//           rowClassName={(_, index) =>
//             index % 2 === 0 ? "table-row-light" : "table-row-gray"
//           }
//           rowHoverable={false} // no-spellcheck
//           size="small"
//         />
//       </Modal>
//     </div>
//   );
// };

// export default ViewSeatAvailability;
import { Button, Modal } from "antd";
import { useState } from "react";
import {
  IFlightSchedule,
  ISeatAvailability,
  SeatAvailabilityStatus,
  TicketClassName,
} from "../../../interfaces";

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

  const getSeatColor = (
    status: SeatAvailabilityStatus,
    ticketClass: TicketClassName,
  ) => {
    if (ticketClass === TicketClassName.BUSINESS) {
      return status === SeatAvailabilityStatus.AVAILABLE
        ? "bg-blue-700"
        : "bg-gray-600";
    }
    return status === SeatAvailabilityStatus.AVAILABLE
      ? "bg-green-500"
      : status === SeatAvailabilityStatus.BOOKED
        ? "bg-yellow-500"
        : "bg-gray-600";
  };

  const renderSeats = (seats: ISeatAvailability[], layout: number[]) => {
    const rows = [];
    for (let i = 0; i < seats.length; i += layout.reduce((a, b) => a + b, 0)) {
      const rowSeats = seats.slice(i, i + layout.reduce((a, b) => a + b, 0));
      rows.push(
        <div
          key={`row-${i}`}
          className="row mb-2 flex items-center justify-between space-x-10"
        >
          {layout.map((_, index) => (
            <div
              key={`group-${i}-${index}`}
              className="group flex items-center space-x-4"
            >
              {rowSeats
                .slice(
                  layout.slice(0, index).reduce((a, b) => a + b, 0),
                  layout.slice(0, index + 1).reduce((a, b) => a + b, 0),
                )
                .map((seat) => (
                  <div
                    key={seat.seatAvailabilityId}
                    className={`seat flex h-8 w-14 cursor-pointer items-center justify-center rounded-md text-xs font-bold text-white ${getSeatColor(
                      seat.status as SeatAvailabilityStatus,
                      seat.seat.ticketClass,
                    )}`}
                    title={`Ghế: ${seat.seat.seatCode} - Hạng: ${seat.seat.ticketClass}`}
                  >
                    <i className="fas fa-chair"></i> {seat.seat.seatCode}
                  </div>
                ))}
            </div>
          ))}
        </div>,
      );
    }
    return rows;
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Xem sơ đồ chỗ ngồi
      </Button>
      <Modal
        open={isOpenModal}
        width="50%"
        title={
          <span className="text-lg font-semibold">
            Sơ đồ chỗ ngồi của chuyến bay {flight.flightId}
          </span>
        }
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null}
      >
        <div
          className="airplane-layout space-y-2 rounded-lg bg-gray-200 p-6 shadow-lg"
          style={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          <div className="cockpit mx-auto rounded-md bg-gray-700 px-2 py-2 text-center text-white">
            <strong>Buồng lái</strong>
          </div>

          <div className="business-section mb-2 space-y-2">
            <div className="text-center text-lg font-bold text-gray-700">
              Hạng Business
            </div>
            {renderSeats(
              flight.seatAvailability.filter(
                (seat) => seat.seat.ticketClass === TicketClassName.BUSINESS,
              ),
              [1, 1, 1],
            )}
          </div>
          <div className="toilet-section airplane-layout mb-6 flex items-center justify-between">
            <div className="toilet-left mx-left rounded-lg bg-gray-400 px-3 py-1 text-center text-white">
              Toilet
            </div>
          </div>

          <div className="exit-section mb-6 flex items-center justify-between">
            <div className="exit-left rounded-lg bg-red-500 px-3 py-1 text-center text-white">
              Exit
            </div>
            <div className="exit-right rounded-lg bg-red-500 px-3 py-1 text-center text-white">
              Exit
            </div>
          </div>

          <div className="economy-section mb-6 space-y-2">
            <div className="text-center text-lg font-bold text-gray-700">
              Hạng Economy
            </div>
            {renderSeats(
              flight.seatAvailability.filter(
                (seat) => seat.seat.ticketClass === TicketClassName.ECONOMY,
              ),
              [3, 3],
            )}
          </div>

          <div className="toilet-section flex items-center justify-between">
            <div className="toilet-left rounded-lg bg-gray-400 px-3 py-1 text-center text-white">
              Toilet
            </div>
          </div>

          <div className="exit-section mb-6 flex items-center justify-between">
            <div className="exit-left rounded-lg bg-red-500 px-3 py-1 text-center text-white">
              Exit
            </div>
            <div className="exit-right rounded-lg bg-red-500 px-3 py-1 text-center text-white">
              Exit
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewSeatAvailability;
