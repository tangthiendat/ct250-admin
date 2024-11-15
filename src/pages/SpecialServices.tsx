import { useQuery } from "@tanstack/react-query";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Access from "../features/auth/Access";
import AddSpecialService from "../features/booking/special-service/AddSpecialService";
import SpecialServiceTable from "../features/booking/special-service/SpecialServiceTable";
import {
  Module,
  PaginationParams,
  PERMISSIONS,
  SortParams,
  SpecialServiceFilterCriteria,
} from "../interfaces";
import { specialService } from "../services/booking/special-service";

const SpecialServices: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const pagination: PaginationParams = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const filter: SpecialServiceFilterCriteria = {
    query: searchParams.get("query") || undefined,
    status:
      searchParams.get("status") === "true"
        ? true
        : searchParams.get("status") === "false"
          ? false
          : undefined,
  };

  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "",
    direction: searchParams.get("direction") || "",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["special-services", pagination, filter, sort].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => specialService.getSpecials(pagination, filter, sort),
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
    <Access permission={PERMISSIONS[Module.SPECIAL_SERVICES].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Dịch vụ đặc biệt </h2>

          <div className="w-[60%]">
            <div className="flex gap-3">
              <Input.Search
                placeholder="Nhập tên dịch vụ để tìm kiếm..."
                defaultValue={query}
                enterButton
                allowClear
                onSearch={handleSearch}
              />
            </div>
          </div>
          <Access
            permission={PERMISSIONS[Module.SPECIAL_SERVICES].CREATE}
            hideChildren
          >
            <AddSpecialService />
          </Access>
        </div>
        <SpecialServiceTable
          specialServicePage={data?.payload}
          isLoading={isLoading}
        />
      </div>
    </Access>
  );
};

export default SpecialServices;
