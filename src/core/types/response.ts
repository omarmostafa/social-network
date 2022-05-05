export interface Response<T> {
  success?: boolean;
  code?: number;
  message?: string;
  version?: number;
  data?: T;
}
