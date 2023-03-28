import { AxiosResponse } from "axios";
import CreateMessageRequest from "../../models/messages/request/CreateMessageRequest";
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

const deleteMessages = (request: string[]): Promise<AxiosResponse> => { 
  return HttpServiceBase.Delete(
    'Message/deleteMessages',
    request,
  )
}

const MessageService = {
  deleteMessages,
  createMessage,
  updateMessage,
}

export default MessageService;