import { RouteType } from "../common";

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
  isActive: boolean;
}

export interface IBaggages {
  baggageId: number;
  baggageWeight: number;
  price: number;
  routeType: RouteType;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface BaggageFilterCriteria {
  query?: string;
  routeType?: RouteType;
}
