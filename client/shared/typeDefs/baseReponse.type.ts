export interface IBaseResponse<T> {
  status: number;
  data: T;
  message: string;
}
export interface IRequestParam {
  id?: number;
  page?: number;
  pageSize?: number;
  pageIndex?: number;
  [key: string]: any;
}

export interface ICreator {
  name: string;
  avatar: string;
}
