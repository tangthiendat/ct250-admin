import { CouponType, RouteType } from "../common";

export interface IMeal {
  mealId: number;
  mealName: string;
  imgUrl?: string;
  mealPricing: IMealPricing[];
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface IMealPricing {
  mealPricingId: number;
  price: number;
  validFrom: string;
  validTo: string;
}

export interface IBaggages {
  baggageId: number;
  baggageWeight: number;
  baggagePricing: IBaggagePricing[];
  routeType: RouteType;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface IBaggagePricing {
  baggagePricingId: number;
  price: number;
  validFrom: string;
  validTo: string;
}

export interface BaggageFilterCriteria {
  query?: string;
  routeType?: RouteType;
}


export interface ICoupons {
  couponId: number;
  couponCode: string;
  discountValue: number;
  couponType: CouponType;
  validFrom: string;
  validTo: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface CouponFilterCriteria {
  query?: string;
  couponType?: CouponType;
}


export interface ICoupons {
  couponId: number;
  couponCode: string;
  discountValue: number;
  couponType: CouponType;
  validFrom: string;
  validTo: string;
  maxUsage: number;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}


export interface ISpecialServices {
  specialServiceId: number;
  serviceName: string;
  description: string;
  conditions: string;
  maxPassengers: number;
  requiredSupport: boolean;
  healthVerification: boolean;
  bookingLeadTime: number;
  specialInstructions: string;
  imgUrl?: string;
  status: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface SpecialServiceFilterCriteria {
  query?: string;
  status?: boolean;
}
