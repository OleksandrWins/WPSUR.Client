import { AxiosResponse } from "axios";
import KilledRussiansModel from "../../models/widgets/KilledRussiansModel";
import HttpServiceBase from "./HttpServiceBase";

const getFreshNumbers = (): Promise<AxiosResponse<KilledRussiansModel>> => {
    return HttpServiceBase.Get<KilledRussiansModel>(
      `OccupantNumbers/OccupantNumbers`
    )
  }

const WidgetsService = {
    getFreshNumbers, 
};

export default WidgetsService;