export const ALL_PERMISSIONS = {
  USERS: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/users" },
    GET_LOGGED_IN: { method: "GET", apiPath: "/api/v1/users/me" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/users/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/users" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/users/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/users/{id}" },
  },
  ROLES: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/roles" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/roles/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/roles" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/roles/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/roles/{id}" },
  },
  PERMISSIONS: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/permissions" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/permissions/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/permissions" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/permissions/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/permissions/{id}" },
  },
  AIRPORTS: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/airports" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/airports/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/airports" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/airports/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/airports/{id}" },
  },
  AIRPLANES: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/airplanes" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/airplanes/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/airplanes" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/airplanes/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/airplanes/{id}" },
  },
};

export const ALL_MODULES = [
  "USERS",
  "ROLES",
  "PERMISSIONS",
  "AIRPORTS",
  "AIRPLANES",
];

export const ALL_METHODS = ["GET", "POST", "PUT", "DELETE"];

export const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh";

export const AIRPLANE_STATUS = ["ACTIVE", "MAINTENANCE", "RETIRED"];
