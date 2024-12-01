import { useQuery } from "@tanstack/react-query";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchDate from "../common/components/SearchDate";
import Access from "../features/auth/Access";
import {
  BookingFilterCriteria,
  BookingStatus,
  Module,
  PaginationParams,
  PERMISSIONS,
  SortParams,
  TripType,
} from "../interfaces";
import { bookingService } from "../services/booking/booking-service";
import BookingTable from "../features/booking/booking-detail/BookingTable";

const Bookings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const pagination: PaginationParams = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const handleDateChange = (
    startDate: string | null,
    endDate: string | null,
    type: string | null,
  ) => {
    if (startDate) {
      searchParams.set("startDate", startDate);
    } else {
      searchParams.delete("startDate");
    }

    if (endDate) {
      searchParams.set("endDate", endDate);
    } else {
      searchParams.delete("endDate");
    }

    if (type) {
      searchParams.set("type", type);
    } else {
      searchParams.delete("type");
    }

    setSearchParams(searchParams);
  };

  const filter: BookingFilterCriteria = {
    query: searchParams.get("query") || undefined,
    bookingStatus:
      (searchParams.get("bookingStatus") as BookingStatus) || undefined,
    tripType: (searchParams.get("tripType") as TripType) || undefined,
    startDate: searchParams.get("startDate") || undefined,
    endDate: searchParams.get("endDate") || undefined,
    type: searchParams.get("type") || undefined,
  };

  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "",
    direction: searchParams.get("direction") || "",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["bookings", pagination, filter, sort].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => bookingService.getBookings(pagination, filter, sort),
  });

  const handleSearch: SearchProps["onSearch"] = (value) => {
    if (value) {
      searchParams.set("query", value);
    } else {
      searchParams.delete("query");
    }
    setSearchParams(searchParams);
  };

  return (
    <Access permission={PERMISSIONS[Module.BOOKINGS].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Đặt chỗ</h2>

          <div className="w-[60%]">
            <div className="flex gap-3">
              <Input.Search
                placeholder="Nhập họ tên, số điện thoại, email, mã nhóm khách hàng, mã đặt chỗ để tìm kiếm..."
                defaultValue={query}
                enterButton
                allowClear
                onSearch={handleSearch}
              />
            </div>
          </div>
          <SearchDate onDateChange={handleDateChange} />
        </div>
        <BookingTable bookingPage={data?.payload} isLoading={isLoading} />
      </div>
    </Access>
  );
};

export default Bookings;
