import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CancelUpdateMessageLogo from "../../../../assets/svg/CancelUpdateMessageLogo/cancelUpdateMessageLogo";
import DeleteMessageLogo from "../../../../assets/svg/DeleteMessageLogo/deleteMessageLogo";
import UpdateMessageLogo from "../../../../assets/svg/UpdateMessageLogo/updateMessageLogo";
import MessageView from "../../../../models/messages/MessageView";
import UpdateMessageNotification from "../../../../models/messages/notifications/updateMessage";
import { ConnectionProvider } from "../../../../shared/http-services/HttpServiceBase";
import "./style.css";
import UpdateMessageInput from "./UpdateMessageInput/updateMessageInput";

const MessageElement = (message: MessageView) => {
  const messageRef = React.useRef<HTMLInputElement>(null);

  const [messageEdit, setMessageEditStatus] = useState<boolean>(false);
  const [messageToDelete, setMessageToDelete] = useState<boolean>(message.isDelete);
  const [messageContentState, setMessageContentState] = useState<string>(
    message.content
  );

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageRef]);

  useEffect(() => {
    messageToDelete
      ? message.addMessagesToDelete(message.id)
      : message.removeMessageToDelete(message.id);
  }, [messageToDelete]);

  const updateEditState = (): void => {
    setMessageEditStatus((prevState: boolean) => !prevState);
  };

  const updateMessageState = (messageToUpdate: string): void => {
    setMessageContentState(messageToUpdate);
  };

  const updateMessage = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();

    setMessageEditStatus((prevState: boolean) => !prevState);
  };

  ConnectionProvider.hubConnection.on(
    "UpdateMessage",
    (messageToUpdate: UpdateMessageNotification) => {

      console.log([message, messageToUpdate])
      console.log(message.id === messageToUpdate.messageId)
      if (message.id !== messageToUpdate.messageId) {
        return;
      }

      setMessageContentState(messageToUpdate.content);
    }
  );

  const toDeleteStyle = {
    backgroundColor: "#486877",
    border: "5px solid #7694A4",
    color: "#F2F1E6",
  };

  const incomeMessageStyle = {
    backgroundColor: "#6998C2",
    border: "5px solid #7694A4",
    color: "#FDFDFA",
  };

  const outcomeMessageStyle = {
    backgroundColor: "#FDFDFA",
    border: "5px solid #BDBCAC",
    color: "#175A9B",
  };

  return (
    <Row ref={messageRef}>
      <Container
        style={
          message.isIncome
            ? incomeMessageStyle
            : messageToDelete
            ? toDeleteStyle
            : outcomeMessageStyle
        }
        className="message-container"
      >
        <Row>
          <Col md={1}>pic</Col>
          <Col md={11}>
            <Row>
              <Col md={10} className="sender-data font-poppins-600">
                {message.userFromFirstName} {message.userFromLastName}
              </Col>
              <Col md={1} className="update-message-button">
                {!message.isIncome ? (
                  <Button
                    type="button"
                    className="transparent-button"
                    onClick={(event: React.MouseEvent<Element, MouseEvent>) =>
                      updateMessage(event)
                    }
                  >
                    {!messageEdit ? (
                      <UpdateMessageLogo />
                    ) : (
                      <CancelUpdateMessageLogo />
                    )}
                  </Button>
                ) : null}
              </Col>
              <Col md={1} className="delete-message-button">
                {!message.isIncome ? (
                  <Button
                    type="button"
                    className="transparent-button"
                    onClick={(event: React.MouseEvent<Element, MouseEvent>) => {
                      event.preventDefault();
                      setMessageToDelete(
                        (prevState: boolean): boolean => !prevState
                      );
                    }}
                  >
                    <DeleteMessageLogo />
                  </Button>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Container
                id="message-content-id"
                className="message-content font-poppins-400"
              >
                {!messageEdit ? (
                  messageContentState
                ) : (
                  <UpdateMessageInput
                    updateMessageContent={updateMessageState}
                    updateEditState={updateEditState}
                    isEdit={messageEdit}
                    content={messageContentState}
                    id={message.id}
                  />
                )}
              </Container>
            </Row>
            <Row>
              <Container className="created-date">
                {message.createdDate.toString()}
              </Container>
            </Row>
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default MessageElement;
