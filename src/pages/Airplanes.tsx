import { useQuery } from "@tanstack/react-query";
import { SearchProps } from "antd/es/input";
import { Input } from "antd";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Access from "../features/auth/Access";
import AddAirplane from "../features/flight/airplane/AddAirplane";
import AirplaneTable from "../features/flight/airplane/AirplaneTable";
import {
  AirplaneFilterCriteria,
  PaginationParams,
  SortParams,
} from "../interfaces";
import { PERMISSIONS } from "../interfaces/common/constants";
import { AirplaneStatus, Module } from "../interfaces/common/enums";
import { airplaneService } from "../services/flight/airplane-service";

const Airplanes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pagination: PaginationParams = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const filter: AirplaneFilterCriteria = {
    query: searchParams.get("query") || undefined,
    // inUse:
    //   searchParams.get("inUse") === "true"
    //     ? true
    //     : searchParams.get("inUse") === "false"
    //       ? false
    //       : undefined,
    status: (searchParams.get("status") as AirplaneStatus) || undefined,
  };

  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "",
    direction: searchParams.get("direction") || "",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["airplanes", pagination, filter, sort].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => airplaneService.getAirplanes(pagination, filter, sort),
  });

  const handleSearch: SearchProps["onSearch"] = (value) => {
    console.log(value);
    if (value) {
      searchParams.set("query", value);
    } else {
      searchParams.delete("query");
    }
    setSearchParams(searchParams);
  };

  return (
    <Access permission={PERMISSIONS[Module.AIRPLANES].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Máy bay</h2>

          <div className="w-[60%]">
            <div className="flex gap-3">
              <Input.Search
                placeholder="Nhập số hiệu đăng ký hoặc tên mô hình máy bay để tìm kiếm..."
                defaultValue={searchParams.get("query") || ""}
                enterButton
                allowClear
                onSearch={handleSearch}
              />
            </div>
          </div>
          <Access
            permission={PERMISSIONS[Module.AIRPLANES].CREATE}
            hideChildren
          >
            <AddAirplane />
          </Access>
        </div>
        <AirplaneTable airplanePage={data?.payload} isLoading={isLoading} />
      </div>
    </Access>
  );
};
export default Airplanes;
