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