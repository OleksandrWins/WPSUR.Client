import { AxiosResponse } from "axios";
import React from "react";
import { Container } from "react-bootstrap";
import ChatView from "../../../models/chats/ChatView";
import ChatService from "../../../shared/http-services/ChatService";
import ChatElement from "./ChatElement/ChatElement";

type ChatsState = {
  chats: ChatView[];
};

export type HtmlChat = {
  htmlElements: Array<JSX.Element>;
};

class MessagePageModule extends React.Component<{}, ChatsState> {
  userFrom: string = "3FA85F64-5717-4562-B3FC-2C963F66AFA6";

  state: ChatsState = {
    chats: [],
  };

  htmlChats: Array<JSX.Element> = [];

  componentDidMount(): void {
    ChatService.getInterlocutors(this.userFrom)
      .then((response: AxiosResponse<ChatView[]>) => {
        console.log(response);

        let chatArray = new Array<ChatView>();

        for (let i = 0; i < response.data.length; i++) {
          let currentEntry = {
            userId: response.data[i].userId,
            userToName: response.data[i].userToName,
          };

          if (!chatArray.includes(currentEntry)) {
            chatArray.push(currentEntry);
          }
        }

        console.log(chatArray);

        return this.setState({
          chats: chatArray,
        });
      })
      .catch((err: any) => console.log(err));
  }

  render() {
    let i = 0;
    this.state.chats.forEach((chat: ChatView) => {
      i++;

      if (this.htmlChats.length < this.state.chats.length) {
        this.htmlChats.push(
          <ChatElement
            userToName={chat.userToName}
            userId={chat.userId}
            key={i}
          />
        );
      }
    });

    return <Container className="message-page">{this.htmlChats}</Container>;
  }
}

export default MessagePageModule;
