import { AxiosResponse } from "axios";
import Chat from "../../models/chats/Chat";
import ChatView from "../../models/chats/ChatView";
import HttpServiceBase from "./HttpServiceBase";

const getInterlocutors = (): Promise<AxiosResponse<ChatView[]>> => {
  return HttpServiceBase.Get<ChatView[]>(`Chat/getChats`);
};

const getChat = (userTo: string): Promise<AxiosResponse<Chat>> => {
  return HttpServiceBase.Get<Chat>(
    `Chat/getChat?userTo=${userTo}`
  );
};

const ChatService = {
  getInterlocutors,
  getChat,
};

export default ChatService;
