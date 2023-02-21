import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import SearchLogo from "../../../assets/svg/SearchLogo/searchLogo";
import ChatView from "../../../models/chats/ChatView";
import ChatService from "../../../shared/http-services/ChatService";
import ChatElement from "./ChatElement/ChatElement";
import "./style.css";

const MessagePageModule = () => {
  const [chats, setChatsState] = useState<ChatView[]>([]);
  const [emailToFind, setEmailToFind] = useState<string>("");
  const [htmlChats, setHtmlChats] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    retrieveChats();
  }, []);

  useEffect(() => {
    convertChatToHtmlChats(chats);
  }, [chats])

  const retrieveChats = () => { 
    ChatService.getInterlocutors()
    .then((response: AxiosResponse<ChatView[]>) => {
      setChatStateDynamic(response.data);
      convertChatToHtmlChats(chats);
    })
    .catch((err: Error) => console.error(err));
  }

  const setChatStateDynamic = (inputChatCollection: ChatView[]): void => {
    let chatArray = new Array<ChatView>();

    for (let i = 0; i < inputChatCollection.length; i++) {
      let currentEntry = {
        receiverId: inputChatCollection[i].receiverId,
        receiverFirstName: inputChatCollection[i].receiverFirstName,
        receiverLastName: inputChatCollection[i].receiverLastName,
        receiverEmail: inputChatCollection[i].receiverEmail,
      };

      if (!chatArray.includes(currentEntry)) {
        chatArray.push(currentEntry);
      }
    }

    setChatsState(chatArray);
  };

  const searchChat = (email: string): void => {
    ChatService.findInterlocutor(email)
      .then((response: AxiosResponse<ChatView[]>) => {
        return setChatStateDynamic(response.data);
      })
      .catch((err: Error) => console.log(err));
  };

  const convertChatToHtmlChats = (chats: ChatView[]) => {
    let chatsCollection: Array<JSX.Element> = [];

    chats.forEach((chat: ChatView) => {
      if (chatsCollection.length < chats.length) {
        chatsCollection.push(
          <ChatElement
            receiverFirstName={chat.receiverFirstName}
            receiverId={chat.receiverId}
            receiverLastName={chat.receiverLastName}
            receiverEmail={chat.receiverEmail}
            key={chatsCollection.length}
          />
        );
      }})

      setHtmlChats(chatsCollection);
    };

    const onSubmitForm = (event: React.FormEvent<HTMLElement>) => {
      event.preventDefault();

      if (emailToFind === "") {
        return;
      }

      searchChat(emailToFind);
    }

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
            <Form
              onSubmit={(event: React.FormEvent<HTMLElement>) => onSubmitForm(event)}
            >
              <InputGroup>
                <InputGroup.Text className="chat-search-logo">
                  <Button className="search-chat-button" type="submit">
                    <SearchLogo />
                  </Button>
                </InputGroup.Text>
                <Form.Control
                  onChange={(event) => setEmailToFind(event.target.value)}
                  placeholder="find chat by email"
                  id="chat-search-control"
                  type="text"
                  className="chat-search-input-control font-poppins-600"
                />
              </InputGroup>
            </Form>
          </Row>
        </Container>
      </Row>
      <Row>
        <Container className="chat-list">{htmlChats}</Container>
      </Row>
    </Container>
  );
};

export default MessagePageModule;
