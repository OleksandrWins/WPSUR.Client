import { AxiosResponse } from "axios";
import EmergencyListModel from "../../models/emergency/emergencyListModel";
import EmergencyInfoResponse from "../../models/emergency/request/EmergencyInfoResponse";
import HttpServiceBase from "./HttpServiceBase";
const getList = (): Promise<AxiosResponse<EmergencyInfoResponse>> => {
    return HttpServiceBase.Get(
      `Emergency`
    )
  }
const setList = (request: EmergencyListModel): Promise<AxiosResponse> => {
  return HttpServiceBase.Post(
    request,
    `Emergency/SetEmergencyInfo`
  )
}
const EmergencyService = {
  getList, 
  setList
};
export default EmergencyService;