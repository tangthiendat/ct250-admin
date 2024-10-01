import { Module } from "../enums";

export const PERMISSIONS = {
  [Module.USERS]: {
    GET_PAGINATION: { method: "GET", apiPath: "/api/v1/users" },
    GET_LOGGED_IN: { method: "GET", apiPath: "/api/v1/users/me" },
    GET_BY_ID: { method: "GET", apiPath: "/api/v1/users/{id}" },
    CREATE: { method: "POST", apiPath: "/api/v1/users" },
    UPDATE: { method: "PUT", apiPath: "/api/v1/users/{id}" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/users/{id}" },
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
};

export const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh";
