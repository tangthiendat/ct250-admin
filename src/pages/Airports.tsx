import { useQuery } from "@tanstack/react-query";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { useSearchParams } from "react-router-dom";
import Access from "../features/auth/Access";
import AddAirport from "../features/flight/airport/AddAirport";
import AirportTable from "../features/flight/airport/AirportTable";
import { SortParams } from "../interfaces";
import { PERMISSIONS } from "../interfaces/common/constants";
import { Module } from "../interfaces/common/enums";
import { airportService } from "../services";
import { useDynamicTitle } from "../utils";

const Airports: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const pagination = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "",
    direction: searchParams.get("direction") || "",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["airports", pagination, query, sort].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => airportService.getAirports(pagination, query, sort),
  });

  const handleSearch: SearchProps["onSearch"] = (value) => {
    if (value) {
      searchParams.set("query", value);
    } else {
      searchParams.delete("query");
    }
    setSearchParams(searchParams);
  };

  useDynamicTitle("Quản lý sân bay - DaViKa Airways");

  return (
    <Access permission={PERMISSIONS[Module.AIRPORTS].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Sân bay</h2>

          <div className="w-[60%]">
            <div className="flex gap-3">
              <Input.Search
                placeholder="Nhập tên hoặc mã của Sân bay & Thành phố để tìm kiếm..."
                defaultValue={query}
                enterButton
                allowClear
                onSearch={handleSearch}
              />
            </div>
          </div>
          <Access permission={PERMISSIONS[Module.AIRPORTS].CREATE} hideChildren>
            <AddAirport />
          </Access>
        </div>
        <AirportTable airportPage={data?.payload} isLoading={isLoading} />
      </div>
    </Access>
  );
};
export default Airports;
