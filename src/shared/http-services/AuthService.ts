import { AxiosResponse } from "axios";
import HttpServiceBase from "./HttpServiceBase";

const loginUser = (request: string): Promise<AxiosResponse<string>> => {
    return HttpServiceBase.Post(
      request,
      `Account/Login`
    )
  }

const AuthService = {
  loginUser,
};

export default AuthService;