export interface IUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  identityNumber: string;
  phoneNumber: string;
  countryId: number;
  active: boolean;
  dateOfBirth: string;
  roles: IRole;
  createdAt: string;
  updatedAt?: string;
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

export interface IRole {
  roleId: number;
  name: string;
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
