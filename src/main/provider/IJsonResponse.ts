export interface IJsonResponse<T> {
    status: number;
    message: string;
    data: T;
  }