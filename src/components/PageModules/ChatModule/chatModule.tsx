import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router";
import Chat from "../../../models/chats/Chat";
import Message from "../../../models/messages/Message";
import MessageView from "../../../models/messages/MessageView";
import ChatService from "../../../shared/http-services/ChatService";
import MessageElement from "./MessageElement/messageElement";

type ChatState = {
  sender: string;
  messages: Message[];
};

const ChatModule = () => {
  const [chat, setState] = useState<ChatState>();

  const htmlMessages: Array<JSX.Element> = [];

  const location = useLocation();

  useEffect(() => {
    () => ChatService.getChat(location.pathname.slice(10)).then(
      (response: AxiosResponse<Chat>) => {
        setState((chat) => {
          return {
            ...chat,
            sender: response.data.receiverName,
            messages: response.data.messages,
          };
        });

        chat?.messages.forEach((message: Message) => {
          htmlMessages.push(
            <MessageElement
              userToName={chat.sender}
              createdDate={message.createdDate}
              content={message.content}
            />
          );
        });
      }
    );
  });

  return <Container>{htmlMessages}</Container>;
};

export default ChatModule;
