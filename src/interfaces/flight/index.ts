import { AirplaneStatus } from "../../common/enums";
import { ICountry } from "../common";

export interface IAirport {
  airportId: number;
  airportName: string;
  airportCode: string;
  cityName: string;
  cityCode: string;
  country: ICountry;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface IAirplane {
  airplaneId: number;
  modelName: string;
  manufacturer: string;
  maxDistance: number;
  velocity: number;
  numberOfSeats: number;
  overallLength: number;
  wingspan: number;
  height: number;
  inUse: boolean;
  status: AirplaneStatus;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}
