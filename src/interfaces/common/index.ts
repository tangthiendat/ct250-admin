export interface ApiResponse<T> {
  payload?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pages: number;
  total: number;
}

export interface Page<T> {
  content: T[];
  meta: PaginationMeta;
}

export interface ICountry {
  countryId: number;
  countryName: string;
  countryCode: number;
}
