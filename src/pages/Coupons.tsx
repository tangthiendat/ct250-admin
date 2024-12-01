import { useQuery } from "@tanstack/react-query";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Access from "../features/auth/Access";
import AddCoupon from "../features/booking/coupon/AddCoupon";
import CouponTable from "../features/booking/coupon/CouponTable";
import {
  CouponFilterCriteria,
  CouponType,
  Module,
  PaginationParams,
  PERMISSIONS,
  SortParams,
} from "../interfaces";
import { couponService } from "../services/booking/coupon-service";
import { useDynamicTitle } from "../utils";

const Coupons: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const pagination: PaginationParams = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  const filter: CouponFilterCriteria = {
    query: searchParams.get("query") || undefined,
    couponType: (searchParams.get("couponType") as CouponType) || undefined,
  };

  const sort: SortParams = {
    sortBy: searchParams.get("sortBy") || "",
    direction: searchParams.get("direction") || "",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["coupons", pagination, filter, sort].filter((key) => {
      if (typeof key === "string") {
        return key !== "";
      } else if (key instanceof Object) {
        return Object.values(key).some(
          (value) => value !== undefined && value !== "",
        );
      }
    }),
    queryFn: () => couponService.getCoupons(pagination, filter, sort),
  });
  const handleSearch: SearchProps["onSearch"] = (value) => {
    if (value) {
      searchParams.set("query", value);
    } else {
      searchParams.delete("query");
    }
    setSearchParams(searchParams);
  };

  useDynamicTitle("Quản lý mã giảm giá - DaViKa Airways");

  return (
    <Access permission={PERMISSIONS[Module.COUPONS].GET_PAGINATION}>
      <div className="card">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Mã giảm giá</h2>

          <div className="w-[60%]">
            <div className="flex gap-3">
              <Input.Search
                placeholder="Nhập mã giảm giá để tìm kiếm..."
                defaultValue={query}
                enterButton
                allowClear
                onSearch={handleSearch}
              />
            </div>
          </div>
          <Access permission={PERMISSIONS[Module.COUPONS].CREATE} hideChildren>
            <AddCoupon />
          </Access>
        </div>
        <CouponTable couponPage={data?.payload} isLoading={isLoading} />
      </div>
    </Access>
  );
};

export default Coupons;
