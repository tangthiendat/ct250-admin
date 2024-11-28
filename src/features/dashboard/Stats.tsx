import { FaRegMoneyBill1 } from "react-icons/fa6";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import Stat from "./Stat";
import { useQuery } from "@tanstack/react-query";
import { bookingService } from "../../services/booking/booking-service";
import Access from "../auth/Access";
import { Module, PERMISSIONS } from "../../interfaces";
import { ticketService } from "../../services/booking/ticket-service";

const Stats: React.FC = () => {
  const { data: last30DaysBookingSales } = useQuery({
    queryKey: ["bookings", "last-30-days-sales"],
    queryFn: () => bookingService.getLast30DaysBookingSales(),
    select: (data) => data.payload,
  });

  const { data: last30DaysBookingCount } = useQuery({
    queryKey: ["bookings", "last-30-days-count"],
    queryFn: () => bookingService.getLast30DaysCount(),
    select: (data) => data.payload,
  });

  const { data: last30DaysTicketCount } = useQuery({
    queryKey: ["tickets", "last-30-days-count"],
    queryFn: () => ticketService.getLast30DaysCount(),
    select: (data) => data.payload,
  });

  return (
    <div className="flex h-auto items-center justify-between gap-6">
      <Access permission={PERMISSIONS[Module.BOOKINGS].GET_LAST_30_DAYS_SALES}>
        <Stat
          name="Doanh thu (30 ngày)"
          value={last30DaysBookingSales?.toLocaleString() || "0"}
          unit="VND"
          icon={
            <div className="rounded-full bg-[#D7FDE4] p-3">
              <FaRegMoneyBill1 size={30} className="text-[#256D33]" />
            </div>
          }
          className="flex-1"
        />
      </Access>
      <Access permission={PERMISSIONS[Module.BOOKINGS].GET_LAST_30_DAYS_COUNT}>
        <Stat
          name="Booking (30 ngày)"
          value={last30DaysBookingCount?.toString() || "0"}
          icon={
            <div className="rounded-full bg-[#DEF2F9] p-3">
              <TbBrandBooking size={30} className="text-[#245D76]" />
            </div>
          }
          className="flex-1"
        />
      </Access>

      <Access permission={PERMISSIONS[Module.TICKETS].GET_LAST_30_DAYS_COUNT}>
        <Stat
          name="Vé (30 ngày)"
          value={last30DaysTicketCount?.toString() || "0"}
          icon={
            <div className="rounded-full bg-[#FCFBBB] p-3">
              <MdOutlineAirplaneTicket size={30} className="text-[#7D6A26]" />
            </div>
          }
          className="flex-1"
        />
      </Access>
    </div>
  );
};

export default Stats;
