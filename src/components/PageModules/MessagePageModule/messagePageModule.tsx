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
}

class MessagePageModule extends React.Component<{},ChatsState> {

  i = 0;

  userFrom: string = "3FA85F64-5717-4562-B3FC-2C963F66AFA6";

  state: ChatsState = {
    chats: [],
  };

  htmlChats: Array<JSX.Element> = [];

  componentDidMount(): void {
    ChatService.getInterlocutors(this.userFrom)
      .then((response: AxiosResponse<string[]>) => {
        console.log(response);

        let chatArray = new Array<ChatView>();

        for (let i = 0; i < response.data.length; i++) {
          if (!chatArray.includes({userId: response.data[i]})) {
            chatArray.push({userId: response.data[i]});
          }
        }

        console.log(chatArray);

        return this.setState({
          chats: chatArray
        })
      })
      .catch((err: any) => console.log(err));
  }

  render() {
    for (let i = 0; i < this.state.chats.length; i++) {
      
    }

    this.state.chats.forEach((chat: ChatView) => {
      console.log(chat.userId);
      this.i++;

      this.htmlChats.push(<ChatElement userId={chat.userId} key={this.i} />);
    });

    this.htmlChats = this.htmlChats.filter((element, index) => {
      return this.htmlChats.indexOf(element) === index;
    });

    console.log(this.htmlChats);

    return <Container className="message-page">{this.htmlChats}</Container>;
  }
}

export default MessagePageModule;