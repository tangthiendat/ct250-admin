import { useQuery } from "@tanstack/react-query";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Access from "../features/auth/Access";
import SearchDate from "../common/components/SearchDate";
import TransactionTable from "../features/transaction/transaction-details/TransactionTable";
import {
  Module,
  PaginationParams,
  PERMISSIONS,
  SortParams,
  TransactionFilterCriteria,
  TransactionStatus,
} from "../interfaces";
import { transactionService } from "../services";
import { useDynamicTitle } from "../utils";

const Transactions: React.FC = () => {
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

  const filter: TransactionFilterCriteria = {
    query: searchParams.get("query") || undefined,
    status: (searchParams.get("status") as TransactionStatus) || undefined,
    startDate: searchParams.get("startDate") || undefined,
    endDate: searchParams.get("endDate") || undefined,
    type: searchParams.get("type") || undefined,
  };

  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "",
    direction: searchParams.get("direction") || "",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", pagination, filter, sort].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => transactionService.getTransactions(pagination, filter, sort),
  });

  const handleSearch: SearchProps["onSearch"] = (value) => {
    if (value) {
      searchParams.set("query", value);
    } else {
      searchParams.delete("query");
    }
    setSearchParams(searchParams);
  };

  useDynamicTitle("Quản lý giao dịch - DaViKa Airways");

  return (
    <Access permission={PERMISSIONS[Module.TRANSACTIONS].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Giao dịch</h2>

          <div className="w-[60%]">
            <div className="flex gap-3">
              <Input.Search
                placeholder="Nhập tên khách hàng, mã đặt vé, mã giao dịch, phương thức thanh toán để tìm kiếm..."
                defaultValue={query}
                enterButton
                allowClear
                onSearch={handleSearch}
              />
            </div>
          </div>
          <SearchDate onDateChange={handleDateChange} />
        </div>
        <TransactionTable
          transactionPage={data?.payload}
          isLoading={isLoading}
        />
      </div>
    </Access>
  );
};

export default Transactions;
