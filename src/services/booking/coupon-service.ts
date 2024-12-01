import { AxiosInstance } from "axios";
import { ApiResponse, CouponFilterCriteria, ICoupons, Page, PaginationParams, SortParams } from "../../interfaces";
import { createApiClient } from "../api-client";

interface ICouponService {
    getCoupons(pagination: PaginationParams, filter: CouponFilterCriteria,
        sort?: SortParams): Promise<ApiResponse<Page<ICoupons>>>;

    create(newCoupon: Omit<ICoupons, "couponId">): Promise<ApiResponse<ICoupons>>;

    update(couponId: number, updatedCoupon: ICoupons): Promise<ApiResponse<ICoupons>>;

    delete(couponId: number): Promise<ApiResponse<void>>;

    getAllCoupons(): Promise<ApiResponse<ICoupons[]>>;
}

const apiClient: AxiosInstance = createApiClient("coupons");

class CouponService implements ICouponService {
    async getCoupons(pagination: PaginationParams, filter?: CouponFilterCriteria, sort?: SortParams): Promise<ApiResponse<Page<ICoupons>>> {
        return (await apiClient.get("", {
            params: {
                ...pagination,
                ...filter,
                sortBy: sort?.sortBy !== "" ? sort?.sortBy : undefined,
                direction: sort?.direction !== "" ? sort?.direction : undefined,
            },
        })).data;
    }

    async create(newCoupon: Omit<ICoupons, "couponId">): Promise<ApiResponse<ICoupons>> {
        return (await apiClient.post("", newCoupon)).data;
    }

    async update(couponId: number, updatedCoupon: ICoupons): Promise<ApiResponse<ICoupons>> {
        return (await apiClient.put(`/${couponId}`, updatedCoupon)).data;
    }

    async delete(couponId: number): Promise<ApiResponse<void>> {
        return (await apiClient.delete(`/${couponId}`)).data;
    }

    async getAllCoupons(): Promise<ApiResponse<ICoupons[]>> {
        return (await apiClient.get("/all")).data;
    }
}

export const couponService = new CouponService();