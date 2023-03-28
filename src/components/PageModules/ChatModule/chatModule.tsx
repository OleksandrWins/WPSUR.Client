import { AxiosResponse } from "axios";
import { CSSProperties, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import MessageSendLogo from "../../../assets/svg/MessageSendLogo/messageSendLogo";
import Chat from "../../../models/chats/Chat";
import Message from "../../../models/messages/Message";
import ChatService from "../../../shared/http-services/ChatService";
import { ConnectionProvider } from "../../../shared/http-services/HttpServiceBase";
import MessageService from "../../../shared/http-services/MessageService";
import MessageElement from "./MessageElement/messageElement";
import "./style.css";
import Moment from "moment";
import React from "react";
import UpdateMessageNotification from "../../../models/messages/notifications/updateMessage";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../../../elements/loadingElement";
import DoneUpdateMessageLogo from "../../../assets/svg/DoneUpdateMessageLogo/doneUpdateMessageLogo";
import CancelUpdateMessageLogo from "../../../assets/svg/CancelUpdateMessageLogo/cancelUpdateMessageLogo";
import DeletionMessageNotification from "../../../models/messages/notifications/deletionMessage";
import ConvertDateService from "../../../shared/ConvertDataServices/ConvertDateService";
import CreateMessageRequest from "../../../models/messages/request/CreateMessageRequest";

const ChatModule = () => {
  const [chat, setChatState] = useState<Chat>({
    sender: { userId: "", userFirstName: "", userLastName: "" },
    receiver: { userId: "", userFirstName: "", userLastName: "" },
    messages: [],
  });
  const [messageValue, setMessageState] = useState<string>("");
  const [htmlMessages, setHtmlMessages] = useState<Array<JSX.Element>>([]);
  const [isLoading, setLoadingState] = useState<boolean>(false);
  const [messagesToDelete, setMessagesToDelete] = useState<string[]>([]);
  const [isMessagesToDelete, setDeleteState] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    console.log(chat);
    convertToHtmlMessages(chat);
  }, [chat.messages]);

  useEffect(() => {
    setDeleteState(messagesToDelete.length > 0);
  }, [messagesToDelete]);

  useEffect(() => {
    retrieveChat();
    ConnectionProvider.hubConnection.start();
  }, [chat.receiver.userId]);

  const removeMessageToDelete = (messageId: string) => {
    console.log("message removed" + " " + messageId);
    setMessagesToDelete((prevState: string[]) => [
      ...prevState.filter(
        (currentMessage: string) => currentMessage !== messageId
      ),
    ]);
  };

  const addMessagesToDelete = (messagesId: string) => {
    console.log("message added" + " " + messagesId);
    setMessagesToDelete((prevState: string[]) => {
      if (prevState.includes(messagesId)) {
        return prevState;
      }
      return [...prevState, messagesId];
    });
  };

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
    console.log(chatInput)
    setHtmlMessages([
      ...chatInput?.messages.map((message: Message) => {
        let isUserFromSender: boolean = chat.sender.userId === message.userFrom;
        console.log(message);
        return (
          <MessageElement
            isDelete={false}
            removeMessageToDelete={removeMessageToDelete}
            addMessagesToDelete={addMessagesToDelete}
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
            key={chatInput.messages.indexOf(message)}
          />
        );
      }),
    ]);
  };

  const setHtmlMessageDynamic = (
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

  const cancelDeleteMessages = (
    event: React.MouseEvent<Element, MouseEvent>
  ) => {
    setDeleteState(false);
    setMessagesToDelete((prevState: string[]): string[] => {
      let messageElements = [
        ...htmlMessages.filter((value: JSX.Element) => {
          return prevState.includes(value.props.id);
        }),
      ];

      setHtmlMessages([
        ...htmlMessages.map((element: JSX.Element) => {
          console.log([messageElements, element]);
          if (!messageElements.includes(element)) {
            return element;
          }

          const changedElement = (
            <MessageElement
              isDelete={false}
              removeMessageToDelete={element.props.removeMessageToDelete}
              addMessagesToDelete={element.props.addMessagesToDelete}
              isIncome={element.props.isIncome}
              userFromFirstName={element.props.userFromFirstName}
              userFromLastName={element.props.userFromLastName}
              createdDate={element.props.createdDate}
              content={element.props.content}
              id={element.props.data}
            />
          );

          return changedElement;
        }),
      ]);

      return [];
    });
  };

  const deleteHtmlMessages = (messagesToDelete: string[]) => {
    console.log(chat.messages);

    setChatState((prevState: Chat) => {
      return {
        ...chat,
        messages: [
          ...prevState.messages.filter(
            (value: Message) => !messagesToDelete.includes(value.id)
          ),
        ],
      };
    });
  };

  const deleteMessages = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();

    setLoadingState(true);

    MessageService.deleteMessages(messagesToDelete)
      .then(() => {
        return setLoadingState(false);
      })
      .catch((err: Error) => console.log(err));

    deleteHtmlMessages(messagesToDelete);
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
            const newChatState: Message = {
              content: createMessageRequest.content,
              userFrom: chat.sender.userId,
              userTo: chat.receiver.userId,
              id: messageId.data,
              createdDate: Moment().toDate(),
            };

            setChatState({
              ...chat,
              messages: [...chat.messages, newChatState],
            });

            setHtmlMessages((messageViewCollection: JSX.Element[]) => {
              setLoadingState(false);
              return setHtmlMessageDynamic(
                messageViewCollection,
                <MessageElement
                  isDelete={false}
                  removeMessageToDelete={removeMessageToDelete}
                  addMessagesToDelete={addMessagesToDelete}
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
    "DeleteMessage",
    (messagesToDelete: DeletionMessageNotification) => {
      if (chat.sender.userId !== messagesToDelete.receiverId) {
        return;
      }

      console.log(messagesToDelete);

      deleteHtmlMessages(messagesToDelete.messageIds);
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

      setChatState((prevState: Chat) => {
        return {
          ...prevState,
          messages: [...chat.messages, messageToGet],
        };
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
              {isMessagesToDelete ? (
                <Container className="create-post-form delete-messages-confirm">
                  <Row>
                    <Container>
                      <span >Delete messages?</span>
                    </Container>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Button
                        className="transparent-button"
                        onClick={(
                          event: React.MouseEvent<Element, MouseEvent>
                        ) => deleteMessages(event)}
                      >
                        {isLoading ? (
                          <LoadingSpinner
                            color="#3498db"
                            containerSideSize={24}
                          />
                        ) : (
                          <DoneUpdateMessageLogo></DoneUpdateMessageLogo>
                        )}
                      </Button>
                    </Col>
                    <Col md={6}>
                      <Button
                        className="transparent-button"
                        onClick={(
                          event: React.MouseEvent<Element, MouseEvent>
                        ) => cancelDeleteMessages(event)}
                      >
                        {isLoading ? null : (
                          <CancelUpdateMessageLogo></CancelUpdateMessageLogo>
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Container>
              ) : (
                <div>
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
                </div>
              )}
            </Row>
          </Form>
        </Container>
      </Row>
    </Container>
  );
};

export default ChatModule;
