import { AxiosResponse } from "axios";
import LoginRequest from "../../models/users/requests/LoginRequest";
import HttpServiceBase from "./HttpServiceBase";

const LoginUser = (
  request: LoginRequest
): Promise<AxiosResponse<string>> => {
  return HttpServiceBase.Post<LoginRequest, string>(request, "Account/Login");
};

const AuthService = {
  LoginUser,
};

export default AuthService;
