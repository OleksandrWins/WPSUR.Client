import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
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

    chatInput.messages.sort();

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
        return htmlMessage.props.id === htmlMessageElement.props.id && htmlMessage.props.id !== "";
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

    let das = document.getElementById("");

    if (das === null) {
      return;
    }

    das.scrollTo(0, document.body.scrollHeight);

    MessageService.createMessage(createMessageRequest).then().catch((error) => console.log(error));
  };

  ConnectionProvider.hubConnection.on(
    "ReceiveMessage",
    (messageToGet: Message) => {

      console.log(messageToGet);
      if (chat.sender.userId !== messageToGet.userTo) {
        return;
      }

      console.log("messageToGet");

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
            createdDate={ConvertDateService.convertDate(messageToGet.createdDate)}
            content={messageToGet.content}
            id={messageToGet.id}
            key={prevState.length}
          />
        );
      });
    }
  );

  return (
    <Container className="chat-page">
      <Row>
        <Container className="background-receiver-logo">
          <Container className="receiver-logo font-poppins-700">
            {chat.receiver.userFirstName} {chat.receiver.userLastName}
          </Container>
        </Container>
      </Row>
      <Row className="chat-history-row">
        <Container className="chat-history">{htmlMessages}</Container>
      </Row>
      <Row className="chat-input">
        <Container className="background-form">
          <Form onSubmit={(event) => onSubmit(event)}>
            <Row className="form-row">
              <Container className="input-col">
                <Form.Control
                  className="message-input-control"
                  id="message-input"
                  value={messageValue}
                  onChange={(event) => setMessageState(event.target.value)}
                  type="text"
                  placeholder="Type some message."
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
