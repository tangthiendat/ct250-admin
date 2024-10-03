import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PERMISSIONS } from "../common/constants";
import { Module } from "../common/enums";
import Access from "../features/auth/Access";
import { PaginationParams, SortParams } from "../interfaces";
import { routeService } from "../services/flight/route-service";
import RouteTable from "../features/flight/route/RouteTable";
import AddRoute from "../features/flight/route/AddRoute";

const Routes: React.FC = () => {
  const [searchParams] = useSearchParams();

  const pagination: PaginationParams = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "",
    direction: searchParams.get("direction") || "",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["routes", pagination, sort].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => routeService.getRoutes(pagination, sort),
  });

  // const handleSearch: SearchProps["onSearch"] = (value) => {
  //   console.log(value);
  //   if (value) {
  //     searchParams.set("query", value);
  //   } else {
  //     searchParams.delete("query");
  //   }
  //   setSearchParams(searchParams);
  // };

  return (
    <Access permission={PERMISSIONS[Module.ROUTES].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Máy bay</h2>

          {/* <div className="w-[60%]">
            <div className="flex gap-3">
              <Input.Search
                placeholder="Nhập tên mô hình máy bay để tìm kiếm..."
                defaultValue={searchParams.get("query") || ""}
                enterButton
                allowClear
                onSearch={handleSearch}
              />
            </div>
          </div> */}
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
