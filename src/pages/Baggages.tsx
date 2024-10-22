import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Access from "../features/auth/Access";
import AddBaggage from "../features/booking/baggage/AddBaggage";
import BaggageTable from "../features/booking/baggage/BaggageTable";
import {
  BaggageFilterCriteria,
  Module,
  PaginationParams,
  PERMISSIONS,
  RouteType,
  SortParams,
} from "../interfaces";
import { baggageService } from "../services/booking/baggage-service";

const Baggages: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pagination: PaginationParams = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const filter: BaggageFilterCriteria = {
    query: searchParams.get("query") || undefined,

    routeType: (searchParams.get("routeType") as RouteType) || undefined,
  };

  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "",
    direction: searchParams.get("direction") || "",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["baggages", pagination, filter, sort].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => baggageService.getBaggages(pagination, filter, sort),
  });

  return (
    <Access permission={PERMISSIONS[Module.BAGGAGES].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Hành lý</h2>
          <Access permission={PERMISSIONS[Module.BAGGAGES].CREATE} hideChildren>
            <AddBaggage />
          </Access>
        </div>
        <BaggageTable baggagePage={data?.payload} isLoading={isLoading} />
      </div>
    </Access>
  );
};

export default Baggages;
