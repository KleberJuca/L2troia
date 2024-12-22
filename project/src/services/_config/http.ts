import axios from "axios";
import { ApiResponse } from "./api";

export class HttpClient {
  static get<TData extends {}>(url: string, config?: Object) {
    return axios.get<TData>(url, config);
  }

  static post<TData extends {}>(url: string, data: Object, config?: Object) {
    return axios.post<ApiResponse<TData>>(url, data, config);
  }

  put(url: string, data: Object, config?: Object) {
    return axios.put(url, data, config);
  }

  delete(url: string, config?: Object) {
    return axios.delete(url, config);
  }
}