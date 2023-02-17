import { AxiosResponse } from "axios";
import { CSSProperties, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router";
import MessageSendLogo from "../../../assets/svg/MessageSendLogo/messageSendLogo";
import Chat from "../../../models/chats/Chat";
import Message from "../../../models/messages/Message";
import CreateMessageRequest from "../../../models/messages/request/CreateMessageRequest";
import ChatService from "../../../shared/http-services/ChatService";
import { ConnectionProvider } from "../../../shared/http-services/HttpServiceBase";
import MessageService from "../../../shared/http-services/MessageService";
import MessageElement from "./MessageElement/messageElement";
import "./style.css";
import Moment from "moment";
import ConvertDateService from "../../../shared/ConvertDataServices/ConvertDateService";
import React from "react";

const ChatModule = () => {
  const [chat, setChatState] = useState<Chat>({
    sender: { userId: "", userFirstName: "", userLastName: "" },
    receiver: { userId: "", userFirstName: "", userLastName: "" },
    messages: [],
  });
  const [messageValue, setMessageState] = useState<string>("");
  const [htmlMessages, setHtmlMessages] = useState<Array<JSX.Element>>([]);

  const location = useLocation();

  useEffect(() => {
    retrieveChat();
    ConnectionProvider.hubConnection.start();
  }, [chat.receiver.userId]);

  const retrieveChat = () => {
    ChatService.getChat(location.pathname.slice(10))
      .then((response: AxiosResponse<Chat>) => {
        setChatState(response.data);
        convertToHtmlMessages(chat);
      })
      .catch((e: Error) => console.log(e));
  };

  const convertToHtmlMessages = (chatInput: Chat) => {
    let messagesCollection: Array<JSX.Element> = [];

    chatInput?.messages.forEach((message: Message) => {
      let isUserFromSender: boolean = chat.sender.userId === message.userFrom;

      messagesCollection.push(
        <MessageElement
          isReceiver={!isUserFromSender}
          userFromFirstName={
            isUserFromSender
              ? chat.sender.userFirstName
              : chat.receiver.userFirstName
          }
          userFromLastName={
            isUserFromSender
              ? chat.sender.userLastName
              : chat.receiver.userLastName
          }
          createdDate={ConvertDateService.convertDate(message.createdDate)}
          content={message.content}
          id={message.id}
          key={messagesCollection.length}
        />
      );
    });

    setHtmlMessages(messagesCollection);
  };

  const setHtmlMessagesDynamic = (
    prevState: JSX.Element[],
    htmlMessageElement: JSX.Element
  ): JSX.Element[] => {
    let isMessageExist: JSX.Element | null =
      prevState.find((htmlMessage: JSX.Element) => {
        return (
          htmlMessage.props.id === htmlMessageElement.props.id &&
          htmlMessage.props.id !== ""
        );
      }) ?? null;

    if (isMessageExist) {
      return prevState;
    }

    let inputHtmlElementArr = prevState;

    return (prevState = [...inputHtmlElementArr, htmlMessageElement]);
  };

  const onSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    console.log(messageValue);

    if (messageValue === "") {
      return;
    }

    let createMessageRequest: CreateMessageRequest = {
      userTo: chat.receiver.userId,
      content: messageValue,
    };

    setHtmlMessages((value: JSX.Element[]) => {
      return setHtmlMessagesDynamic(
        value,
        <MessageElement
          isReceiver={false}
          userFromFirstName={chat.sender.userFirstName}
          userFromLastName={chat.sender.userLastName}
          createdDate={ConvertDateService.convertDate(Moment().toDate())}
          content={createMessageRequest.content}
          id=""
          key={value.length}
        />
      );
    });

    MessageService.createMessage(createMessageRequest)
      .then()
      .catch((error) => console.log(error));
  };

  // ConnectionProvider.hubConnection.on(
  //   "UpdateMessage",
  //   (messageToUpdate:Message) => { 
  //     if 
  //   }
  // )

  ConnectionProvider.hubConnection.on(
    "ReceiveMessage",
    (messageToGet: Message) => {
      if (chat.sender.userId !== messageToGet.userTo) {
        return;
      }

      let isUserFromReceiver: boolean =
        messageToGet.userFrom === chat.receiver.userId;

      setHtmlMessages((prevState: JSX.Element[]): JSX.Element[] => {
        return setHtmlMessagesDynamic(
          prevState,
          <MessageElement
            isReceiver={isUserFromReceiver}
            userFromFirstName={
              isUserFromReceiver ? chat.receiver.userFirstName : "error"
            }
            userFromLastName={
              isUserFromReceiver ? chat.receiver.userLastName : "error"
            }
            createdDate={ConvertDateService.convertDate(
              messageToGet.createdDate
            )}
            content={messageToGet.content}
            id={messageToGet.id}
            key={prevState.length}
          />
        );
      });
    }
  );

  const isHtmlMessagesEmpty = (): boolean => { 
    return htmlMessages.length === 0;
  }

  const splashScreenStyle: CSSProperties = {
    paddingTop: "25%",
    paddingBottom: "12%",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontSize: "36px",
    color: "#7694A4",
    fontWeight: "600",
  }

  const chatHistoryStyle: CSSProperties = { 
    position: "absolute",
  }

  const splashScreenText: string = "Type a message to start the dialog.";

  return (
    <Container className="chat-page">
      <Row className="header-chat-page">
        <Container className="background-receiver-logo">
          <Row className="m-0 justify-content-center">
          <Container className="receiver-logo font-poppins-700">
            {chat.receiver.userFirstName} {chat.receiver.userLastName}
          </Container>
          </Row>
        </Container>
      </Row>
      <Row id="chat-page-id" className="chat-history-row">
        <Container className="chat-history" style={isHtmlMessagesEmpty() ? splashScreenStyle : undefined}>{isHtmlMessagesEmpty() ? splashScreenText : htmlMessages}</Container>
      </Row>
      <Row style={isHtmlMessagesEmpty() ? undefined : chatHistoryStyle} className="chat-input">
        <Container className="background-form">
          <Form onSubmit={(event) => onSubmit(event)}>
            <Row className="form-row justify-content-center">
              <Container className="message-input-col">
                <Form.Control
                  className="message-input-control"
                  id="message-input"
                  value={messageValue}
                  onChange={(event) => setMessageState(event.target.value)}
                  type="text"
                />
              </Container>
              <Container className="button-col">
                <Button type="submit" className="send-button">
                  <MessageSendLogo />
                </Button>
              </Container>
            </Row>
          </Form>
        </Container>
      </Row>
    </Container>
  );
};

export default ChatModule;
