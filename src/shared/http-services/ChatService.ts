import { AxiosResponse } from "axios";
import Chat from "../../models/chats/Chat";
import GetChatRequest from "../../models/chats/request/GetChatRequest";
import HttpServiceBase from "./HttpServiceBase";

const getInterlocutors = (userId: string): Promise<AxiosResponse<string[]>> => {
  return HttpServiceBase.Get<string[]>(`Chat/getChats?senderID=${userId}`);
};

const getChat = (request: GetChatRequest): Promise<AxiosResponse<Chat>> => {
  return HttpServiceBase.Get<Chat>(
    `getChat?userFrom=${request.userFrom}&userTo=${request.userTo}`
  );
};

const ChatService = {
  getInterlocutors,
  getChat,
};

export default ChatService;
