import { useQuery } from "@tanstack/react-query";
import { SearchProps } from "antd/es/input";
import { Input } from "antd/lib";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { ALL_PERMISSIONS } from "../constants";
import Access from "../features/auth/Access";
import AddAirplane from "../features/flight/airplane/AddAirplane";
import AirplaneTable from "../features/flight/airplane/AirplaneTable";
import { airplaneService } from "../services/airplane-service";

const Airplanes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const pagination = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["airplanes", pagination, query],
    queryFn: () => airplaneService.getAirplanes(pagination, query),
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
    <Access permission={ALL_PERMISSIONS.AIRPLANES.GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Máy bay</h2>

          <div className="w-[60%]">
            <div className="flex gap-3">
              <Input.Search
                placeholder="Nhập tên model máy bay để tìm kiếm..."
                defaultValue={query}
                enterButton
                allowClear
                onSearch={handleSearch}
              />
            </div>
          </div>
          <Access permission={ALL_PERMISSIONS.AIRPLANES.CREATE} hideChildren>
            <AddAirplane />
          </Access>
        </div>
        <AirplaneTable airplanePage={data?.payload} isLoading={isLoading} />
      </div>
    </Access>
  );
};
export default Airplanes;
