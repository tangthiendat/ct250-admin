import { useQuery } from "@tanstack/react-query";
import { SearchProps } from "antd/es/input";
import { Input } from "antd";
import { useSearchParams } from "react-router-dom";
import Access from "../features/auth/Access";
import AddRoute from "../features/flight/route/AddRoute";
import RouteTable from "../features/flight/route/RouteTable";
import { PaginationParams, SortParams } from "../interfaces";
import { PERMISSIONS } from "../interfaces/common/constants";
import { Module } from "../interfaces/common/enums";
import { routeService } from "../services/flight/route-service";

const Routes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const pagination: PaginationParams = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "",
    direction: searchParams.get("direction") || "",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["routes", pagination, query, sort].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => routeService.getRoutes(pagination, sort, query),
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
    <Access permission={PERMISSIONS[Module.ROUTES].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Máy bay</h2>

          <div className="w-[60%]">
            <div className="flex gap-3">
              <Input.Search
                placeholder="Nhập tên hoặc mã sân bay đến, sân bay đi để tìm kiếm..."
                defaultValue={query}
                enterButton
                allowClear
                onSearch={handleSearch}
              />
            </div>
          </div>
          <Access permission={PERMISSIONS[Module.ROUTES].CREATE} hideChildren>
            <AddRoute />
          </Access>
        </div>
        <RouteTable routePage={data?.payload} isLoading={isLoading} />
      </div>
    </Access>
  );
};

export default Routes;
