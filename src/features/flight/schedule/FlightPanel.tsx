import {
  AirplaneStatus,
  IFlightSchedule,
  RouteType,
  TicketClass,
} from "../../../interfaces";
import FlightList from "./FlightList";
const flights: IFlightSchedule[] = [
  {
    flightId: "DVK101",
    departureDateTime: "2024-10-15T08:00:00",
    arrivalDateTime: "2024-10-15T10:00:00",
    flightStatus: "SCHEDULED",
    route: {
      routeId: 26,
      departureAirport: {
        airportId: 1,
        airportName: "Tan Son Nhat INTERNATIONAL Airport",
        airportCode: "SGN",
        cityName: "Ho Chi Minh",
        cityCode: "SGN",
        country: {
          countryId: 235,
          countryName: "Viet Nam",
          countryCode: 84,
          iso2Code: "VN",
          iso3Code: "VNM",
        },
        createdAt: "2024-10-13T12:02:47.14863",
      },
      arrivalAirport: {
        airportId: 2,
        airportName: "Noi Bai INTERNATIONAL Airport",
        airportCode: "HAN",
        cityName: "Ha Noi",
        cityCode: "HAN",
        country: {
          countryId: 235,
          countryName: "Viet Nam",
          countryCode: 84,
          iso2Code: "VN",
          iso3Code: "VNM",
        },
        createdAt: "2024-10-13T12:02:47.14863",
      },
      routeType: RouteType.DOMESTIC,
      createdAt: "2024-10-13T12:02:47.172164",
    },
    flightPricing: [
      {
        flightPricingId: 1,
        ticketPrice: 1739000.0,
        ticketClass: TicketClass.ECONOMY,
        validFrom: "2024-10-15",
        validTo: "2024-10-20",
      },
      {
        flightPricingId: 2,
        ticketPrice: 4623000.0,
        ticketClass: TicketClass.BUSINESS,
        validFrom: "2024-10-15",
        validTo: "2024-10-20",
      },
    ],
    seatAvailability: [
      {
        seatAvailabilityId: 1,
        seat: {
          seatId: 1,
          ticketClass: TicketClass.BUSINESS,
          seatCode: "1A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 2,
        seat: {
          seatId: 2,
          ticketClass: TicketClass.BUSINESS,
          seatCode: "1B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 3,
        seat: {
          seatId: 3,
          ticketClass: TicketClass.BUSINESS,
          seatCode: "1C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 4,
        seat: {
          seatId: 4,
          ticketClass: TicketClass.BUSINESS,
          seatCode: "1D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 5,
        seat: {
          seatId: 5,
          ticketClass: TicketClass.BUSINESS,
          seatCode: "1E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 6,
        seat: {
          seatId: 6,
          ticketClass: TicketClass.BUSINESS,
          seatCode: "1F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 7,
        seat: {
          seatId: 7,
          ticketClass: TicketClass.BUSINESS,
          seatCode: "1G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 8,
        seat: {
          seatId: 8,
          ticketClass: TicketClass.BUSINESS,
          seatCode: "1H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 9,
        seat: {
          seatId: 9,
          ticketClass: TicketClass.BUSINESS,
          seatCode: "1J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 10,
        seat: {
          seatId: 10,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 11,
        seat: {
          seatId: 11,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 12,
        seat: {
          seatId: 12,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 13,
        seat: {
          seatId: 13,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 14,
        seat: {
          seatId: 14,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 15,
        seat: {
          seatId: 15,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 16,
        seat: {
          seatId: 16,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 17,
        seat: {
          seatId: 17,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 18,
        seat: {
          seatId: 18,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 19,
        seat: {
          seatId: 19,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 20,
        seat: {
          seatId: 20,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 21,
        seat: {
          seatId: 21,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 22,
        seat: {
          seatId: 22,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 23,
        seat: {
          seatId: 23,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 24,
        seat: {
          seatId: 24,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 25,
        seat: {
          seatId: 25,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 26,
        seat: {
          seatId: 26,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 27,
        seat: {
          seatId: 27,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 28,
        seat: {
          seatId: 28,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 29,
        seat: {
          seatId: 29,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 30,
        seat: {
          seatId: 30,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 31,
        seat: {
          seatId: 31,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 32,
        seat: {
          seatId: 32,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 33,
        seat: {
          seatId: 33,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 34,
        seat: {
          seatId: 34,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 35,
        seat: {
          seatId: 35,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 36,
        seat: {
          seatId: 36,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 37,
        seat: {
          seatId: 37,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 38,
        seat: {
          seatId: 38,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 39,
        seat: {
          seatId: 39,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 40,
        seat: {
          seatId: 40,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 41,
        seat: {
          seatId: 41,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 42,
        seat: {
          seatId: 42,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 43,
        seat: {
          seatId: 43,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 44,
        seat: {
          seatId: 44,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 45,
        seat: {
          seatId: 45,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 46,
        seat: {
          seatId: 46,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 47,
        seat: {
          seatId: 47,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 48,
        seat: {
          seatId: 48,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 49,
        seat: {
          seatId: 49,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 50,
        seat: {
          seatId: 50,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 51,
        seat: {
          seatId: 51,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 52,
        seat: {
          seatId: 52,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 53,
        seat: {
          seatId: 53,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 54,
        seat: {
          seatId: 54,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 55,
        seat: {
          seatId: 55,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 56,
        seat: {
          seatId: 56,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 57,
        seat: {
          seatId: 57,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 58,
        seat: {
          seatId: 58,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 59,
        seat: {
          seatId: 59,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 60,
        seat: {
          seatId: 60,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 61,
        seat: {
          seatId: 61,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 62,
        seat: {
          seatId: 62,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 63,
        seat: {
          seatId: 63,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 64,
        seat: {
          seatId: 64,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 65,
        seat: {
          seatId: 65,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 66,
        seat: {
          seatId: 66,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 67,
        seat: {
          seatId: 67,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 68,
        seat: {
          seatId: 68,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 69,
        seat: {
          seatId: 69,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 70,
        seat: {
          seatId: 70,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 71,
        seat: {
          seatId: 71,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 72,
        seat: {
          seatId: 72,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 73,
        seat: {
          seatId: 73,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 74,
        seat: {
          seatId: 74,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 75,
        seat: {
          seatId: 75,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 76,
        seat: {
          seatId: 76,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 77,
        seat: {
          seatId: 77,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 78,
        seat: {
          seatId: 78,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 79,
        seat: {
          seatId: 79,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 80,
        seat: {
          seatId: 80,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 81,
        seat: {
          seatId: 81,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 82,
        seat: {
          seatId: 82,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 83,
        seat: {
          seatId: 83,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 84,
        seat: {
          seatId: 84,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 85,
        seat: {
          seatId: 85,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 86,
        seat: {
          seatId: 86,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 87,
        seat: {
          seatId: 87,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 88,
        seat: {
          seatId: 88,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 89,
        seat: {
          seatId: 89,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 90,
        seat: {
          seatId: 90,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 91,
        seat: {
          seatId: 91,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 92,
        seat: {
          seatId: 92,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 93,
        seat: {
          seatId: 93,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 94,
        seat: {
          seatId: 94,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 95,
        seat: {
          seatId: 95,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 96,
        seat: {
          seatId: 96,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 97,
        seat: {
          seatId: 97,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 98,
        seat: {
          seatId: 98,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 99,
        seat: {
          seatId: 99,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 100,
        seat: {
          seatId: 100,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 101,
        seat: {
          seatId: 101,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 102,
        seat: {
          seatId: 102,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 103,
        seat: {
          seatId: 103,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 104,
        seat: {
          seatId: 104,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 105,
        seat: {
          seatId: 105,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 106,
        seat: {
          seatId: 106,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 107,
        seat: {
          seatId: 107,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 108,
        seat: {
          seatId: 108,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 109,
        seat: {
          seatId: 109,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 110,
        seat: {
          seatId: 110,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 111,
        seat: {
          seatId: 111,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 112,
        seat: {
          seatId: 112,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 113,
        seat: {
          seatId: 113,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 114,
        seat: {
          seatId: 114,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 115,
        seat: {
          seatId: 115,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 116,
        seat: {
          seatId: 116,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 117,
        seat: {
          seatId: 117,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 118,
        seat: {
          seatId: 118,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 119,
        seat: {
          seatId: 119,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 120,
        seat: {
          seatId: 120,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 121,
        seat: {
          seatId: 121,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 122,
        seat: {
          seatId: 122,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 123,
        seat: {
          seatId: 123,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 124,
        seat: {
          seatId: 124,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 125,
        seat: {
          seatId: 125,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 126,
        seat: {
          seatId: 126,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 127,
        seat: {
          seatId: 127,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 128,
        seat: {
          seatId: 128,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 129,
        seat: {
          seatId: 129,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 130,
        seat: {
          seatId: 130,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 131,
        seat: {
          seatId: 131,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 132,
        seat: {
          seatId: 132,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 133,
        seat: {
          seatId: 133,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 134,
        seat: {
          seatId: 134,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 135,
        seat: {
          seatId: 135,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 136,
        seat: {
          seatId: 136,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 137,
        seat: {
          seatId: 137,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 138,
        seat: {
          seatId: 138,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 139,
        seat: {
          seatId: 139,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 140,
        seat: {
          seatId: 140,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 141,
        seat: {
          seatId: 141,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 142,
        seat: {
          seatId: 142,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 143,
        seat: {
          seatId: 143,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 144,
        seat: {
          seatId: 144,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 145,
        seat: {
          seatId: 145,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 146,
        seat: {
          seatId: 146,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 147,
        seat: {
          seatId: 147,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 148,
        seat: {
          seatId: 148,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 149,
        seat: {
          seatId: 149,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 150,
        seat: {
          seatId: 150,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 151,
        seat: {
          seatId: 151,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 152,
        seat: {
          seatId: 152,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 153,
        seat: {
          seatId: 153,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 154,
        seat: {
          seatId: 154,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 155,
        seat: {
          seatId: 155,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 156,
        seat: {
          seatId: 156,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 157,
        seat: {
          seatId: 157,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 158,
        seat: {
          seatId: 158,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 159,
        seat: {
          seatId: 159,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 160,
        seat: {
          seatId: 160,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 161,
        seat: {
          seatId: 161,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 162,
        seat: {
          seatId: 162,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 163,
        seat: {
          seatId: 163,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 164,
        seat: {
          seatId: 164,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 165,
        seat: {
          seatId: 165,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 166,
        seat: {
          seatId: 166,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 167,
        seat: {
          seatId: 167,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 168,
        seat: {
          seatId: 168,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 169,
        seat: {
          seatId: 169,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 170,
        seat: {
          seatId: 170,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 171,
        seat: {
          seatId: 171,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 172,
        seat: {
          seatId: 172,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 173,
        seat: {
          seatId: 173,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 174,
        seat: {
          seatId: 174,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 175,
        seat: {
          seatId: 175,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 176,
        seat: {
          seatId: 176,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 177,
        seat: {
          seatId: 177,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 178,
        seat: {
          seatId: 178,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 179,
        seat: {
          seatId: 179,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 180,
        seat: {
          seatId: 180,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 181,
        seat: {
          seatId: 181,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 182,
        seat: {
          seatId: 182,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 183,
        seat: {
          seatId: 183,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 184,
        seat: {
          seatId: 184,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 185,
        seat: {
          seatId: 185,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 186,
        seat: {
          seatId: 186,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 187,
        seat: {
          seatId: 187,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 188,
        seat: {
          seatId: 188,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 189,
        seat: {
          seatId: 189,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 190,
        seat: {
          seatId: 190,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 191,
        seat: {
          seatId: 191,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 192,
        seat: {
          seatId: 192,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 193,
        seat: {
          seatId: 193,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 194,
        seat: {
          seatId: 194,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 195,
        seat: {
          seatId: 195,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 196,
        seat: {
          seatId: 196,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 197,
        seat: {
          seatId: 197,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 198,
        seat: {
          seatId: 198,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 199,
        seat: {
          seatId: 199,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 200,
        seat: {
          seatId: 200,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 201,
        seat: {
          seatId: 201,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 202,
        seat: {
          seatId: 202,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 203,
        seat: {
          seatId: 203,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 204,
        seat: {
          seatId: 204,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 205,
        seat: {
          seatId: 205,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 206,
        seat: {
          seatId: 206,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 207,
        seat: {
          seatId: 207,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 208,
        seat: {
          seatId: 208,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 209,
        seat: {
          seatId: 209,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 210,
        seat: {
          seatId: 210,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 211,
        seat: {
          seatId: 211,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 212,
        seat: {
          seatId: 212,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 213,
        seat: {
          seatId: 213,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 214,
        seat: {
          seatId: 214,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 215,
        seat: {
          seatId: 215,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 216,
        seat: {
          seatId: 216,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 217,
        seat: {
          seatId: 217,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 218,
        seat: {
          seatId: 218,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 219,
        seat: {
          seatId: 219,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 220,
        seat: {
          seatId: 220,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 221,
        seat: {
          seatId: 221,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 222,
        seat: {
          seatId: 222,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 223,
        seat: {
          seatId: 223,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 224,
        seat: {
          seatId: 224,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 225,
        seat: {
          seatId: 225,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 226,
        seat: {
          seatId: 226,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 227,
        seat: {
          seatId: 227,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 228,
        seat: {
          seatId: 228,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 229,
        seat: {
          seatId: 229,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 230,
        seat: {
          seatId: 230,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 231,
        seat: {
          seatId: 231,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 232,
        seat: {
          seatId: 232,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 233,
        seat: {
          seatId: 233,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 234,
        seat: {
          seatId: 234,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 235,
        seat: {
          seatId: 235,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 236,
        seat: {
          seatId: 236,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 237,
        seat: {
          seatId: 237,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 238,
        seat: {
          seatId: 238,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 239,
        seat: {
          seatId: 239,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 240,
        seat: {
          seatId: 240,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 241,
        seat: {
          seatId: 241,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 242,
        seat: {
          seatId: 242,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 243,
        seat: {
          seatId: 243,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 244,
        seat: {
          seatId: 244,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 245,
        seat: {
          seatId: 245,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 246,
        seat: {
          seatId: 246,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 247,
        seat: {
          seatId: 247,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 248,
        seat: {
          seatId: 248,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 249,
        seat: {
          seatId: 249,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 250,
        seat: {
          seatId: 250,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 251,
        seat: {
          seatId: 251,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 252,
        seat: {
          seatId: 252,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 253,
        seat: {
          seatId: 253,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 254,
        seat: {
          seatId: 254,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 255,
        seat: {
          seatId: 255,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 256,
        seat: {
          seatId: 256,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 257,
        seat: {
          seatId: 257,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 258,
        seat: {
          seatId: 258,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 259,
        seat: {
          seatId: 259,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 260,
        seat: {
          seatId: 260,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 261,
        seat: {
          seatId: 261,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 262,
        seat: {
          seatId: 262,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 263,
        seat: {
          seatId: 263,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 264,
        seat: {
          seatId: 264,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 265,
        seat: {
          seatId: 265,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 266,
        seat: {
          seatId: 266,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 267,
        seat: {
          seatId: 267,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 268,
        seat: {
          seatId: 268,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 269,
        seat: {
          seatId: 269,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 270,
        seat: {
          seatId: 270,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30J",
        },
        status: "AVAILABLE",
      },
    ],
    airplane: {
      airplaneId: 1,
      registrationNumber: "N78701",
      model: {
        modelId: 1,
        modelName: "Boeing 787",
      },
      manufacturer: "Boeing",
      maxDistance: 15750,
      velocity: 954,
      numberOfSeats: 311,
      overallLength: 63.73,
      wingspan: 60.93,
      height: 18.76,
      status: AirplaneStatus.ACTIVE,
      createdAt: "2024-10-13T12:02:47.167819",
    },
    createdAt: "2024-10-13T12:02:47.176934",
  },
  {
    flightId: "DVK102",
    departureDateTime: "2024-10-15T09:00:00",
    arrivalDateTime: "2024-10-15T11:00:00",
    flightStatus: "SCHEDULED",
    route: {
      routeId: 26,
      departureAirport: {
        airportId: 1,
        airportName: "Tan Son Nhat INTERNATIONAL Airport",
        airportCode: "SGN",
        cityName: "Ho Chi Minh",
        cityCode: "SGN",
        country: {
          countryId: 235,
          countryName: "Viet Nam",
          countryCode: 84,
          iso2Code: "VN",
          iso3Code: "VNM",
        },
        createdAt: "2024-10-13T12:02:47.14863",
      },
      arrivalAirport: {
        airportId: 2,
        airportName: "Noi Bai INTERNATIONAL Airport",
        airportCode: "HAN",
        cityName: "Ha Noi",
        cityCode: "HAN",
        country: {
          countryId: 235,
          countryName: "Viet Nam",
          countryCode: 84,
          iso2Code: "VN",
          iso3Code: "VNM",
        },
        createdAt: "2024-10-13T12:02:47.14863",
      },
      routeType: RouteType.DOMESTIC,
      createdAt: "2024-10-13T12:02:47.172164",
    },
    flightPricing: [
      {
        flightPricingId: 3,
        ticketPrice: 1739000.0,
        ticketClass: TicketClass.ECONOMY,
        validFrom: "2024-10-15",
        validTo: "2024-10-20",
      },
      {
        flightPricingId: 4,
        ticketPrice: 4623000.0,
        ticketClass: TicketClass.BUSINESS,
        validFrom: "2024-10-15",
        validTo: "2024-10-20",
      },
    ],
    seatAvailability: [
      {
        seatAvailabilityId: 271,
        seat: {
          seatId: 10,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 272,
        seat: {
          seatId: 11,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 273,
        seat: {
          seatId: 12,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 274,
        seat: {
          seatId: 13,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 275,
        seat: {
          seatId: 14,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 276,
        seat: {
          seatId: 15,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 277,
        seat: {
          seatId: 16,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 278,
        seat: {
          seatId: 17,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 279,
        seat: {
          seatId: 18,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 280,
        seat: {
          seatId: 280,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 281,
        seat: {
          seatId: 281,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 282,
        seat: {
          seatId: 282,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 283,
        seat: {
          seatId: 283,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 284,
        seat: {
          seatId: 284,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 285,
        seat: {
          seatId: 285,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 286,
        seat: {
          seatId: 286,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 287,
        seat: {
          seatId: 287,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 288,
        seat: {
          seatId: 288,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 289,
        seat: {
          seatId: 289,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 290,
        seat: {
          seatId: 290,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 291,
        seat: {
          seatId: 291,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 292,
        seat: {
          seatId: 292,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 293,
        seat: {
          seatId: 293,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 294,
        seat: {
          seatId: 294,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 295,
        seat: {
          seatId: 295,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 296,
        seat: {
          seatId: 296,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 297,
        seat: {
          seatId: 297,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 298,
        seat: {
          seatId: 298,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 299,
        seat: {
          seatId: 299,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 300,
        seat: {
          seatId: 300,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 301,
        seat: {
          seatId: 301,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 302,
        seat: {
          seatId: 302,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 303,
        seat: {
          seatId: 303,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 304,
        seat: {
          seatId: 304,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 305,
        seat: {
          seatId: 305,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 306,
        seat: {
          seatId: 306,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 307,
        seat: {
          seatId: 307,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 308,
        seat: {
          seatId: 308,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30A",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 309,
        seat: {
          seatId: 309,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 310,
        seat: {
          seatId: 310,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 311,
        seat: {
          seatId: 311,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 312,
        seat: {
          seatId: 312,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 313,
        seat: {
          seatId: 313,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 314,
        seat: {
          seatId: 314,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 315,
        seat: {
          seatId: 315,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 316,
        seat: {
          seatId: 316,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 317,
        seat: {
          seatId: 317,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 318,
        seat: {
          seatId: 318,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 319,
        seat: {
          seatId: 319,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 320,
        seat: {
          seatId: 320,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 321,
        seat: {
          seatId: 321,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 322,
        seat: {
          seatId: 322,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 323,
        seat: {
          seatId: 323,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 324,
        seat: {
          seatId: 324,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 325,
        seat: {
          seatId: 325,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 326,
        seat: {
          seatId: 326,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 327,
        seat: {
          seatId: 327,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 328,
        seat: {
          seatId: 328,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 329,
        seat: {
          seatId: 329,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 330,
        seat: {
          seatId: 330,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 331,
        seat: {
          seatId: 331,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 332,
        seat: {
          seatId: 332,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 333,
        seat: {
          seatId: 333,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 334,
        seat: {
          seatId: 334,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 335,
        seat: {
          seatId: 335,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 336,
        seat: {
          seatId: 336,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 337,
        seat: {
          seatId: 337,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30B",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 338,
        seat: {
          seatId: 338,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 339,
        seat: {
          seatId: 339,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 340,
        seat: {
          seatId: 340,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 341,
        seat: {
          seatId: 341,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 342,
        seat: {
          seatId: 342,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 343,
        seat: {
          seatId: 343,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 344,
        seat: {
          seatId: 344,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 345,
        seat: {
          seatId: 345,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 346,
        seat: {
          seatId: 346,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 347,
        seat: {
          seatId: 347,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 348,
        seat: {
          seatId: 348,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 349,
        seat: {
          seatId: 349,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 350,
        seat: {
          seatId: 350,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 351,
        seat: {
          seatId: 351,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 352,
        seat: {
          seatId: 352,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 353,
        seat: {
          seatId: 353,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 354,
        seat: {
          seatId: 354,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 355,
        seat: {
          seatId: 355,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 356,
        seat: {
          seatId: 356,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 357,
        seat: {
          seatId: 357,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 358,
        seat: {
          seatId: 358,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 359,
        seat: {
          seatId: 359,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 360,
        seat: {
          seatId: 360,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 361,
        seat: {
          seatId: 361,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 362,
        seat: {
          seatId: 362,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 363,
        seat: {
          seatId: 363,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 364,
        seat: {
          seatId: 364,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 365,
        seat: {
          seatId: 365,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 366,
        seat: {
          seatId: 366,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30C",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 367,
        seat: {
          seatId: 367,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 368,
        seat: {
          seatId: 368,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 369,
        seat: {
          seatId: 369,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 370,
        seat: {
          seatId: 370,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 371,
        seat: {
          seatId: 371,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 372,
        seat: {
          seatId: 372,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 373,
        seat: {
          seatId: 373,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 374,
        seat: {
          seatId: 374,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 375,
        seat: {
          seatId: 375,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 376,
        seat: {
          seatId: 376,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 377,
        seat: {
          seatId: 377,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 378,
        seat: {
          seatId: 378,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 379,
        seat: {
          seatId: 379,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 380,
        seat: {
          seatId: 380,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 381,
        seat: {
          seatId: 381,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 382,
        seat: {
          seatId: 382,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 383,
        seat: {
          seatId: 383,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 384,
        seat: {
          seatId: 384,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 385,
        seat: {
          seatId: 385,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 386,
        seat: {
          seatId: 386,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 387,
        seat: {
          seatId: 387,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 388,
        seat: {
          seatId: 388,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 389,
        seat: {
          seatId: 389,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 390,
        seat: {
          seatId: 390,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 391,
        seat: {
          seatId: 391,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 392,
        seat: {
          seatId: 392,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 393,
        seat: {
          seatId: 393,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 394,
        seat: {
          seatId: 394,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 395,
        seat: {
          seatId: 395,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30D",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 396,
        seat: {
          seatId: 396,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 397,
        seat: {
          seatId: 397,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 398,
        seat: {
          seatId: 398,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 399,
        seat: {
          seatId: 399,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 400,
        seat: {
          seatId: 400,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 401,
        seat: {
          seatId: 401,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 402,
        seat: {
          seatId: 402,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 403,
        seat: {
          seatId: 403,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 404,
        seat: {
          seatId: 404,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 405,
        seat: {
          seatId: 405,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 406,
        seat: {
          seatId: 406,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 407,
        seat: {
          seatId: 407,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 408,
        seat: {
          seatId: 408,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 409,
        seat: {
          seatId: 409,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 410,
        seat: {
          seatId: 410,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 411,
        seat: {
          seatId: 411,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 412,
        seat: {
          seatId: 412,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 413,
        seat: {
          seatId: 413,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 414,
        seat: {
          seatId: 414,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 415,
        seat: {
          seatId: 415,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 416,
        seat: {
          seatId: 416,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 417,
        seat: {
          seatId: 417,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 418,
        seat: {
          seatId: 418,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 419,
        seat: {
          seatId: 419,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 420,
        seat: {
          seatId: 420,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 421,
        seat: {
          seatId: 421,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 422,
        seat: {
          seatId: 422,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 423,
        seat: {
          seatId: 423,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 424,
        seat: {
          seatId: 424,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30E",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 425,
        seat: {
          seatId: 425,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 426,
        seat: {
          seatId: 426,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 427,
        seat: {
          seatId: 427,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 428,
        seat: {
          seatId: 428,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 429,
        seat: {
          seatId: 429,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 430,
        seat: {
          seatId: 430,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 431,
        seat: {
          seatId: 431,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 432,
        seat: {
          seatId: 432,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 433,
        seat: {
          seatId: 433,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 434,
        seat: {
          seatId: 434,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 435,
        seat: {
          seatId: 435,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 436,
        seat: {
          seatId: 436,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 437,
        seat: {
          seatId: 437,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 438,
        seat: {
          seatId: 438,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 439,
        seat: {
          seatId: 439,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 440,
        seat: {
          seatId: 440,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 441,
        seat: {
          seatId: 441,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 442,
        seat: {
          seatId: 442,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 443,
        seat: {
          seatId: 443,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 444,
        seat: {
          seatId: 444,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 445,
        seat: {
          seatId: 445,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 446,
        seat: {
          seatId: 446,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 447,
        seat: {
          seatId: 447,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 448,
        seat: {
          seatId: 448,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 449,
        seat: {
          seatId: 449,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 450,
        seat: {
          seatId: 450,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 451,
        seat: {
          seatId: 451,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 452,
        seat: {
          seatId: 452,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 453,
        seat: {
          seatId: 453,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30F",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 454,
        seat: {
          seatId: 454,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 455,
        seat: {
          seatId: 455,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 456,
        seat: {
          seatId: 456,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 457,
        seat: {
          seatId: 457,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 458,
        seat: {
          seatId: 458,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 459,
        seat: {
          seatId: 459,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 460,
        seat: {
          seatId: 460,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 461,
        seat: {
          seatId: 461,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 462,
        seat: {
          seatId: 462,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 463,
        seat: {
          seatId: 463,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 464,
        seat: {
          seatId: 464,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 465,
        seat: {
          seatId: 465,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 466,
        seat: {
          seatId: 466,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 467,
        seat: {
          seatId: 467,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 468,
        seat: {
          seatId: 468,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 469,
        seat: {
          seatId: 469,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 470,
        seat: {
          seatId: 470,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 471,
        seat: {
          seatId: 471,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 472,
        seat: {
          seatId: 472,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 473,
        seat: {
          seatId: 473,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 474,
        seat: {
          seatId: 474,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 475,
        seat: {
          seatId: 475,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 476,
        seat: {
          seatId: 476,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 477,
        seat: {
          seatId: 477,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 478,
        seat: {
          seatId: 478,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 479,
        seat: {
          seatId: 479,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 480,
        seat: {
          seatId: 480,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 481,
        seat: {
          seatId: 481,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 482,
        seat: {
          seatId: 482,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30G",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 483,
        seat: {
          seatId: 483,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 484,
        seat: {
          seatId: 484,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 485,
        seat: {
          seatId: 485,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 486,
        seat: {
          seatId: 486,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 487,
        seat: {
          seatId: 487,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 488,
        seat: {
          seatId: 488,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 489,
        seat: {
          seatId: 489,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 490,
        seat: {
          seatId: 490,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 491,
        seat: {
          seatId: 491,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 492,
        seat: {
          seatId: 492,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 493,
        seat: {
          seatId: 493,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 494,
        seat: {
          seatId: 494,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 495,
        seat: {
          seatId: 495,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 496,
        seat: {
          seatId: 496,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 497,
        seat: {
          seatId: 497,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 498,
        seat: {
          seatId: 498,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 499,
        seat: {
          seatId: 499,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 500,
        seat: {
          seatId: 500,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 501,
        seat: {
          seatId: 501,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 502,
        seat: {
          seatId: 502,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 503,
        seat: {
          seatId: 503,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 504,
        seat: {
          seatId: 504,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 505,
        seat: {
          seatId: 505,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 506,
        seat: {
          seatId: 506,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 507,
        seat: {
          seatId: 507,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 508,
        seat: {
          seatId: 508,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 509,
        seat: {
          seatId: 509,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 510,
        seat: {
          seatId: 510,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 511,
        seat: {
          seatId: 511,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30H",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 512,
        seat: {
          seatId: 512,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "2J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 513,
        seat: {
          seatId: 513,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "3J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 514,
        seat: {
          seatId: 514,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "4J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 515,
        seat: {
          seatId: 515,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "5J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 516,
        seat: {
          seatId: 516,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "6J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 517,
        seat: {
          seatId: 517,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "7J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 518,
        seat: {
          seatId: 518,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "8J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 519,
        seat: {
          seatId: 519,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "9J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 520,
        seat: {
          seatId: 520,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "10J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 521,
        seat: {
          seatId: 521,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "11J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 522,
        seat: {
          seatId: 522,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "12J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 523,
        seat: {
          seatId: 523,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "13J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 524,
        seat: {
          seatId: 524,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "14J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 525,
        seat: {
          seatId: 525,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "15J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 526,
        seat: {
          seatId: 526,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "16J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 527,
        seat: {
          seatId: 527,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "17J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 528,
        seat: {
          seatId: 528,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "18J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 529,
        seat: {
          seatId: 529,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "19J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 530,
        seat: {
          seatId: 530,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "20J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 531,
        seat: {
          seatId: 531,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "21J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 532,
        seat: {
          seatId: 532,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "22J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 533,
        seat: {
          seatId: 533,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "23J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 534,
        seat: {
          seatId: 534,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "24J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 535,
        seat: {
          seatId: 535,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "25J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 536,
        seat: {
          seatId: 536,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "26J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 537,
        seat: {
          seatId: 537,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "27J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 538,
        seat: {
          seatId: 538,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "28J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 539,
        seat: {
          seatId: 539,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "29J",
        },
        status: "AVAILABLE",
      },
      {
        seatAvailabilityId: 540,
        seat: {
          seatId: 540,
          ticketClass: TicketClass.ECONOMY,
          seatCode: "30J",
        },
        status: "AVAILABLE",
      },
    ],
    airplane: {
      airplaneId: 2,
      registrationNumber: "N78702",
      model: {
        modelId: 1,
        modelName: "Boeing 787",
      },
      manufacturer: "Boeing",
      maxDistance: 15750,
      velocity: 954,
      numberOfSeats: 311,
      overallLength: 63.73,
      wingspan: 60.93,
      height: 18.76,
      status: AirplaneStatus.ACTIVE,
      createdAt: "2024-10-13T12:02:47.167819",
    },
    createdAt: "2024-10-13T12:02:47.176934",
  },
];
const FlightPanel: React.FC = () => {
  return (
    <div className="basis-[74%]">
      <div className="px-2 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Danh sách chuyến bay</h2>
        </div>
      </div>

      <FlightList flights={flights} />
    </div>
  );
};

export default FlightPanel;
