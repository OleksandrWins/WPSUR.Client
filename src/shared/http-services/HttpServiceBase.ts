import { AxiosResponse } from "axios";
import http from "./HttpCommon";
import * as signalR from "@microsoft/signalr";

const baseURL: string = "http://localhost:5164";

const Get = <T>(url: string): Promise<AxiosResponse<T>> => {
  return http.get<T>(`${baseURL}/api/${url}`);
};

const Post = <T, Y>(payload: T, url: string): Promise<AxiosResponse<Y>> => {
  return http.post<Y>(`${baseURL}/api/${url}`, payload);
};

const Put = <P, R>(payload: P, url: string): Promise<AxiosResponse<R>> => { 
  return http.put<R>(`${baseURL}/api/${url}`, payload);
}

const Delete = <T, Y>(url: string, payload?: T): Promise<AxiosResponse<Y>> => {
  return http.delete<Y>(`${baseURL}/api/${url}`, {
    data: payload,
  });
};

const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(baseURL + "/chat")
  .build();

const HttpServiceBase = {
  Get,
  Post,
  Delete,
  Put,
};

export const ConnectionProvider = {
  hubConnection,
  http,
};

export default HttpServiceBase;
