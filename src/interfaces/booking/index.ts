import { Dayjs } from "dayjs";
import { CouponType, Gender, ICountry, PassengerType, RouteType } from "../common";
import { IUser } from "../auth";

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


export interface ITicket {
  ticketId: number;
  ticketNumber: string;
  pdfUrl: string;
  status: string;
  passengerName: string;
  passengerGroup: string;
  bookingCode: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface TicketFilterCriteria {
  query?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
}

export interface IPassenger {
  passengerId: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | Dayjs;
  country: ICountry;
  phoneNumber: string;
  passengerType: PassengerType;
  gender: Gender;
  user: IUser;
  createdAt: string;
  updatedAt?: string;
}

export interface PassengerFilterCriteria {
  query?: string;
  passengerType?: PassengerType;
  gender?: Gender;
  startDate?: string;
  endDate?: string;
  type?: string;
}



