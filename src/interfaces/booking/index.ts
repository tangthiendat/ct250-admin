import { RouteType } from "../common";

export interface IMeal {
    mealId: number;
    mealName: string;
    price: number;
    imgUrl?: string;
    createdAt: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
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