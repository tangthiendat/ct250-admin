import { Pagination } from "antd";
import FlightList from "./FlightList";
import { useEffect, useState } from "react";
import { PaginationConfig } from "antd/es/pagination";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { flightScheduleService } from "../../../services";
import Loading from "../../../common/components/Loading";
import { PaginationParams } from "../../../interfaces";
import AddFlight from "./AddFlight";

const FlightPanel: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<PaginationConfig>(() => ({
    align: "end",
    defaultCurrent: Number(searchParams.get("page")) || 1,
    defaultPageSize: Number(searchParams.get("pageSize")) || 10,
    showSizeChanger: true,
    onChange(current, size) {
      searchParams.set("page", current.toString());
      searchParams.set("pageSize", size.toString());
      setSearchParams(searchParams);
    },
  }));

  const paginationParams: PaginationParams = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["flights", paginationParams].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => flightScheduleService.getFlights(paginationParams),
  });

  useEffect(() => {
    if (data) {
      setPagination((prev) => ({
        ...prev,
        total: data?.payload?.meta.total,
        showTotal: (total) => `Tổng ${total} chuyến bay`,
      }));
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="px-2 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Danh sách chuyến bay</h2>
          <AddFlight />
        </div>
      </div>

      <FlightList flights={data?.payload?.content || []} />
      <Pagination {...pagination} />
    </div>
  );
};

export default FlightPanel;
