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
export enum TicketClass {
  ECONOMY = "ECONOMY",
  BUSINESS = "BUSINESS",
}