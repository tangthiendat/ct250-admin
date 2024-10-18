import { AirplaneStatus, RouteType, TicketClass } from "../common/enums";
import { ICountry } from "../common";

export interface IAirport {
  airportId: number;
  airportName: string;
  airportCode: string;
  cityName: string;
  cityCode: string;
  imgUrl: string;
  country: ICountry;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface IAirplane {
  airplaneId: number;
  model: IModel;
  manufacturer: string;
  maxDistance: number;
  velocity: number;
  numberOfSeats: number;
  overallLength: number;
  wingspan: number;
  height: number;
  status: AirplaneStatus;
  registrationNumber: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface IModel {
  modelId: number;
  modelName: string;
}

export interface AirplaneFilterCriteria {
  query?: string;
  status?: AirplaneStatus;
}

export interface IRoute {
  routeId: number;
  departureAirport: IAirport;
  arrivalAirport: IAirport;
  routeType: RouteType;
  duration: number;
  createdAt: string;
  updatedAt?: string;
}

export interface IFlightPricing {
  flightPricingId: number;
  ticketPrice: number;
  ticketClass: TicketClass;
  validFrom: string;
  validTo: string;
}

export interface ISeat {
  seatId: number;
  ticketClass: TicketClass;
  seatCode: string;
}

export interface ISeatAvailability {
  seatAvailabilityId: number;
  seat: ISeat;
  status: string;
}

export interface IFlightSchedule {
  flightId: string;
  departureDateTime: string;
  arrivalDateTime: string;
  flightStatus: string;
  route: IRoute;
  flightPricing: IFlightPricing[];
  seatAvailability: ISeatAvailability[];
  airplane: IAirplane;
  createdAt: string;
}
