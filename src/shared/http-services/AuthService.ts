import { AxiosResponse } from "axios";
import LoginRequest from "../../models/users/requests/loginRequest";
import RegisterRequest from "../../models/users/requests/registerRequest";
import HttpServiceBase from "./HttpServiceBase";

const loginUser = (request: LoginRequest): Promise<AxiosResponse<string>> => {
    return HttpServiceBase.Post(
      request,
      `Account/Login`
    )
  }

const registerUser = (request: RegisterRequest): Promise<AxiosResponse<string>> => {
  return HttpServiceBase.Post(
    request,
    `Account/Register`
  )
}

const AuthService = {
  loginUser, 
  registerUser
};

export default AuthService;