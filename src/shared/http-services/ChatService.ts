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

const findInterlocutor = (email: string): Promise<AxiosResponse<ChatView[]>> => {
  return HttpServiceBase.Get<ChatView[]>(
    `Chat/findChat?email=${email}`
  )
}

const ChatService = {
  getInterlocutors,
  getChat,
  findInterlocutor,
};

export default ChatService;
