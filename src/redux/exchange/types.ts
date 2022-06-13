import { AxiosResponse } from "axios";

export interface IExchangeData {
  from: string;
  to: string;
};

type JSONValue = 
  | string
  | number
  | boolean

export interface IExchangeResponse {
  rate: JSONValue
};

export interface IExchangeState {
  rate: AxiosResponse | null;
  status: string;
  error: null | string;
};