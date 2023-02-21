import { AxiosResponse } from "axios";
import { CSSProperties, useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import MessageSendLogo from "../../../assets/svg/MessageSendLogo/messageSendLogo";
import Chat from "../../../models/chats/Chat";
import Message from "../../../models/messages/Message";
import CreateMessageRequest from "../../../models/messages/request/createMessageRequest";
import ChatService from "../../../shared/http-services/ChatService";
import { ConnectionProvider } from "../../../shared/http-services/HttpServiceBase";
import MessageService from "../../../shared/http-services/MessageService";
import MessageElement from "./MessageElement/messageElement";
import "./style.css";
import Moment from "moment";
import React from "react";
import UpdateMessageNotification from "../../../models/messages/notifications/updateMessage";
import ConvertDateService from "../../../shared/convertDataServices/convertDateService";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../../../elements/loadingElement";

const ChatModule = () => {
  const [chat, setChatState] = useState<Chat>({
    sender: { userId: "", userFirstName: "", userLastName: "" },
    receiver: { userId: "", userFirstName: "", userLastName: "" },
    messages: [],
  });
  const [messageValue, setMessageState] = useState<string>("");
  const [htmlMessages, setHtmlMessages] = useState<Array<JSX.Element>>([]);
  const [isLoading, setLoadingState] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    retrieveChat();
    ConnectionProvider.hubConnection.start();
  }, [chat.receiver.userId]);

  const retrieveChat = () => {
    ChatService.getChat(location.pathname.slice(10))
      .then((response: AxiosResponse<Chat>) => {
        console.log(response);
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
          isIncome={!isUserFromSender}
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

    setLoadingState(true);

    console.log(messageValue);

    if (messageValue === "") {
      setLoadingState(false);
      return;
    }

    let createMessageRequest: CreateMessageRequest = {
      userTo: chat.receiver.userId,
      content: messageValue,
    };

    setTimeout(
      () =>
        MessageService.createMessage(createMessageRequest)
          .then((messageId: AxiosResponse<string>) => {
            setHtmlMessages((messageViewCollection: JSX.Element[]) => {
              setLoadingState(false);
              return setHtmlMessagesDynamic(
                messageViewCollection,
                <MessageElement
                  isIncome={false}
                  userFromFirstName={chat.sender.userFirstName}
                  userFromLastName={chat.sender.userLastName}
                  createdDate={ConvertDateService.convertDate(
                    Moment().toDate()
                  )}
                  content={createMessageRequest.content}
                  id={messageId.data}
                  key={messageViewCollection.length}
                />
              );
            });
          })
          .catch((error) => console.log(error)),
      500
    );

    setMessageState("");
  };

  ConnectionProvider.hubConnection.on(
    "UpdateMessage",
    (messageToUpdate: UpdateMessageNotification) => {
      if (chat.sender.userId !== messageToUpdate.receiverId) {
        return;
      }

      window.location.reload();

      // setHtmlMessages((prevState: JSX.Element[]) => {
      //   let elementToUpdate = htmlMessages.find((element: JSX.Element) => {
      //     console.log([element.props.id, messageToUpdate.messageId]);
      //     if (element.props.id === messageToUpdate.messageId) {
      //       return element;
      //     }
      //   });
      //   console.log(elementToUpdate);

      //   if (!elementToUpdate) {
      //     console.error("An error while updating the message!");
      //     return prevState;
      //   }

      //   return setHtmlMessagesDynamic(prevState, elementToUpdate);

      //   // let inputMessage = React.cloneElement(elementToUpdate, {
      //   //   content: `${messageToUpdate.content}`,
      //   //   updatedDate: ConvertDateService.convertDate(
      //   //     messageToUpdate.updatedDate
      //   //   ),
      //   // });

      //   // return {
      //   //   ...prevState,
      //   //   inputMessage,
      //   // };
      // });
    }
  );

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
            isIncome={isUserFromReceiver}
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
  };

  const splashScreenStyle: CSSProperties = {
    paddingTop: "20%",
    paddingBottom: "8%",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontSize: "36px",
    color: "#7694A4",
    fontWeight: "600",
  };

  const chatHistoryStyle: CSSProperties = {
    position: "absolute",
  };

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
        <Container
          className="chat-history"
          style={isHtmlMessagesEmpty() ? splashScreenStyle : undefined}
        >
          {isHtmlMessagesEmpty() ? splashScreenText : htmlMessages}
        </Container>
      </Row>
      <Row
        style={isHtmlMessagesEmpty() ? undefined : chatHistoryStyle}
        className="chat-input"
      >
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
                {isLoading ? (
                  <LoadingSpinner color="#3498db" containerSideSize={24} />
                ) : (
                  <Button type="submit" className="send-button">
                    <MessageSendLogo />
                  </Button>
                )}
              </Container>
            </Row>
          </Form>
        </Container>
      </Row>
    </Container>
  );
};

export default ChatModule;
