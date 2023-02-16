import { AxiosResponse } from "axios";
import Message from "../../models/messages/Message";
import CreateMessageRequest from "../../models/messages/request/CreateMessageRequest";
import HttpServiceBase from "./HttpServiceBase";

const createMessage = (request: CreateMessageRequest): Promise<AxiosResponse<Message>> => {
  return HttpServiceBase.Post<CreateMessageRequest, Message>(
    request,
    `Message/createMessage`
  )
}

const MessageService = {
  createMessage,
}

export default MessageService;