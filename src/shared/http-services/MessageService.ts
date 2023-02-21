import { AxiosResponse } from "axios";
import CreateMessageRequest from "../../models/messages/request/createMessageRequest";
import UpdateMessageRequest from "../../models/messages/request/updateMessageRequest";
import HttpServiceBase from "./HttpServiceBase";

const createMessage = (request: CreateMessageRequest): Promise<AxiosResponse<string>> => {
  return HttpServiceBase.Post<CreateMessageRequest, string>(
    request,
    `Message/createMessage`
  )
}

const updateMessage = (request: UpdateMessageRequest): Promise<AxiosResponse> => { 
  return HttpServiceBase.Put(
    request,
    'Message/updateMessage'
  )
}

const MessageService = {
  createMessage,
  updateMessage,
}

export default MessageService;