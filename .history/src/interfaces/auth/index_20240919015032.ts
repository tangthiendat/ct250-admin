import { Dayjs } from "dayjs";
import { ICountry } from "../common";

export interface IUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  password?: string;
  identityNumber: string;
  phoneNumber: string;
  country: ICountry;
  active: boolean;
  dateOfBirth: string | Dayjs;
  role: IRole;
  createdAt: string;
  updatedAt?: string;
  avatar?: string;
}

export interface IPermission {
  permissionId: number;
  name: string;
  apiPath: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  module: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PermissionFilterCriteria {
  method?: string;
  module?: string;
}

export interface IRole {
  roleId: number;
  roleName: string;
  active: boolean;
  description?: string;
  permissions: IPermission[];
  createdAt: string;
  updatedAt?: string;
}

export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
}
