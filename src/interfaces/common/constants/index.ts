import { CouponType, Module, PassengerType, RouteType, TransactionStatus } from "../enums";

export const PERMISSIONS = {
  [Module.USERS]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/users" },
    GET_LOGGED_IN: { method: "GET", apiPath: "/api/v1/users/me" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/users/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/users" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/users/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/users/{id}" },
    CHANGE_PASSWORD: {
      method: "PUT",
      apiPath: "/api/v1/users/{id}/change-password",
    },
  },
  [Module.ROLES]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/roles" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/roles/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/roles" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/roles/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/roles/{id}" },
  },
  [Module.PERMISSIONS]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/permissions" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/permissions/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/permissions" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/permissions/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/permissions/{id}" },
  },
  [Module.AIRPORTS]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/airports" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/airports/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/airports" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/airports/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/airports/{id}" },
  },
  [Module.AIRPLANES]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/airplanes" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/airplanes/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/airplanes" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/airplanes/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/airplanes/{id}" },
  },
  [Module.ROUTES]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/routes" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/routes/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/routes" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/routes/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/routes/{id}" },
  },
  [Module.FLIGHTS]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/flights" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/flights/{id}" },
    GET_ALL: { method: "GET", apiPath: "/api/v1/flights/all" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/flights/{id}" },
    UPLOAD: { method: "POST", apiPath: "/api/v1/flights/upload" },
  },
  [Module.MEALS]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/meals" },
    GET_ALL: { method: "GET", apiPath: "/api/v1/meals/all" },
    CREATE: { method: "POST", apiPath: "/api/v1/meals" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/meals/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/meals/{id}" },
  },
  [Module.BAGGAGES]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/baggage" },
    GET_ALL: { method: "GET", apiPath: "/api/v1/baggage/all" },
    CREATE: { method: "POST", apiPath: "/api/v1/baggage" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/baggage/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/baggage/{id}" },
  },
  [Module.FEES]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/fees" },
    GET_ALL: { method: "GET", apiPath: "/api/v1/fees/all" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/fees/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/fees" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/fees/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/fees/{id}" },
  },
  [Module.FEE_GROUP]: {
    GET_ALL: { method: "GET", apiPath: "/api/v1/fee-groups/all" },
  },
  [Module.COUPONS]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/coupons" },
    GET_ALL: { method: "GET", apiPath: "/api/v1/coupons/all" },
    CREATE: { method: "POST", apiPath: "/api/v1/coupons" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/coupons/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/coupons/{id}" },
  },
  [Module.PAYMENT_METHODS]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/payment-methods" },
    GET_ALL: { method: "GET", apiPath: "/api/v1/payment-methods/all" },
    CREATE: { method: "POST", apiPath: "/api/v1/payment-methods" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/payment-methods/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/payment-methods/{id}" },
  },
  [Module.TRANSACTIONS]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/transactions" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/transactions/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/transactions" },
  },
  [Module.SPECIAL_SERVICES]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/special-services" },
    GET_ALL: { method: "GET", apiPath: "/api/v1/special-services/all" },
    CREATE: { method: "POST", apiPath: "/api/v1/special-services" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/special-services/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/special-services/{id}" },
  },
};



export const ROUTE_TYPE_TRANSLATION: Record<RouteType, string> = {
  [RouteType.DOMESTIC]: "Nội địa",
  [RouteType.INTERNATIONAL]: "Quốc tế",
};

export const PASSENGER_TYPE_TRANSLATION: Record<PassengerType, string> = {
  [PassengerType.ADULT]: "Người lớn",
  [PassengerType.CHILD]: "Trẻ em",
  [PassengerType.INFANT]: "Em bé",
};

export const COUPON_TYPE_TRANSLATION: Record<CouponType, string> = {
  [CouponType.AMOUNT]: "VND",
  [CouponType.PERCENTAGE]: "%"
}

export const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh";

export const PRIMARY_COLOR = "#004AAD";


export const TRANSACTION_STATUS_TRANSLATION: Record<TransactionStatus, string> = {
  [TransactionStatus.COMPLETED]: "Hoàn thành",
  [TransactionStatus.FAILED]: "Thất bại",
  [TransactionStatus.PENDING]: "Đang xử lý",
}