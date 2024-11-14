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
  FEES = "FEES",
  FEE_GROUP = "FEE-GROUP",
  COUPONS = "COUPONS",
  PAYMENT_METHODS = "PAYMENT-METHODS",
  TRANSACTIONS = "TRANSACTIONS",
}

//TRANSACTIONS
export enum TransactionType {
  PAYMENT = "PAYMENT",
  REFUND = "REFUND",
  CANCEL = "CANCEL",
}
export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

//COUPONS
export enum CouponType {
  PERCENTAGE = "PERCENTAGE",
  AMOUNT = "AMOUNT",
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

export enum PassengerType {
  ADULT = "ADULT",
  CHILD = "CHILD",
  INFANT = "INFANT",
}

export enum TripType {
  ONE_WAY = "ONE_WAY",
  ROUND_TRIP = "ROUND_TRIP",
  MULTI_CITY = "MULTI_CITY",
}

export enum TicketStatus {
  CANCELLED = "CANCELLED",
  BOOKED = "BOOKED",
  USED = "USED",
}

export enum BookingStatus {
  INIT = "INIT",// ĐẶT CHỖ ĐANG TRONG QUÁ TRÌNH XỬ LÝ, CHƯA HOÀN TẤT
  PENDING = "PENDING", // ĐẶT CHỖ ĐANG TRONG QUÁ TRÌNH XỬ LÝ, CHƯA HOÀN TẤT
  CONFIRMED = "CONFIRMED", // ĐẶT CHỖ ĐÃ ĐƯỢC XÁC NHẬN
  CANCELLED = "CANCELLED", // ĐẶT CHỖ ĐÃ BỊ HỦY
  COMPLETED = "COMPLETED", // ĐẶT CHỖ ĐÃ HOÀN TẤT
  REFUNDED = "REFUNDED", // ĐẶT CHỖ ĐÃ ĐƯỢC HOÀN TIỀN
  RESERVED = "RESERVED", // ĐẶT CHỖ ĐANG TRONG QUÁ TRÌNH XỬ LÝ, CHƯA HOÀN TẤT
  PAID = "PAID", // ĐẶT CHỖ ĐÃ ĐƯỢC THANH TOÁN
}