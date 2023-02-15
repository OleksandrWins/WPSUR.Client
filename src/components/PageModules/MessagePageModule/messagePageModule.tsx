import { AxiosResponse } from "axios";
import React from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import SearchLogo from "../../../assets/svg/SearchLogo/searchLogo";
import ChatView from "../../../models/chats/ChatView";
import ChatService from "../../../shared/http-services/ChatService";
import ChatElement from "./ChatElement/chatElement";
import "./style.css";

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
    ChatService.getInterlocutors()
      .then((response: AxiosResponse<ChatView[]>) => {
        console.log(response);

        let chatArray = new Array<ChatView>();

        for (let i = 0; i < response.data.length; i++) {
          let currentEntry = {
            userId: response.data[i].userId,
            userToFirstName: response.data[i].userToFirstName,
            userToLastName: response.data[i].userToLastName,
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
    this.state.chats.forEach((chat: ChatView) => {
      if (this.htmlChats.length < this.state.chats.length) {
        this.htmlChats.push(
          <ChatElement
            userToFirstName={chat.userToFirstName}
            userId={chat.userId}
            userToLastName={chat.userToLastName}
            key={this.htmlChats.length}
          />
        );
      }
    });

    return (
      <Container className="message-page">
        <Row className="justify-content-center">
          <Container className="message-page-header font-poppins-600">
            Messages
          </Container>
        </Row>
        <Row>
          <Container className="chat-search-input">
            <Row className="justify-content-center">
                <InputGroup>
                  <InputGroup.Text className="chat-search-logo"><SearchLogo /></InputGroup.Text>
                  <Form.Control placeholder="find chat" id="chat-search-control" type="text" className="chat-search-input-control" />
                </InputGroup>
            </Row>
          </Container>
        </Row>
        <Row>
          <Container className="chat-list">{this.htmlChats}</Container>
        </Row>
      </Container>
    );
  }
}

export default MessagePageModule;
