export interface IErrors {
  errors?: IError[];
}

export interface IError {
  value?: string;
  msg: string;
  param?: string;
  location?: string;
}
