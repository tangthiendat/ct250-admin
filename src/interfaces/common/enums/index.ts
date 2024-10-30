//PERMISSIONS
export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum Module {
  USERS = "USERS",
  ROLES = "ROLES",
  PERMISSIONS = "PERMISSIONS",
  AIRPORTS = "AIRPORTS",
  AIRPLANES = "AIRPLANES",
  ROUTES = "ROUTES",
  FLIGHTS = "FLIGHTS",
  MEALS = "MEALS",
  BAGGAGES = "BAGGAGE",
}

//AIRPLANES
export enum AirplaneStatus {
  ACTIVE = "ACTIVE",
  MAINTENANCE = "MAINTENANCE",
  RETIRED = "RETIRED",
}

//ROUTE
export enum RouteType {
  DOMESTIC = "DOMESTIC",
  INTERNATIONAL = "INTERNATIONAL",
}

//FLIGHTS
export enum TicketClassName {
  ECONOMY = "ECONOMY",
  BUSINESS = "BUSINESS",
}

export enum SeatAvailabilityStatus {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  BLOCKED = "BLOCKED",
}

export enum FlightStatus {
  SCHEDULED = "SCHEDULED",
  DELAYED = "DELAYED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}
