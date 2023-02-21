import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CancelUpdateMessageLogo from "../../../../assets/svg/CancelUpdateMessageLogo/cancelUpdateMessageLogo";
import UpdateMessageLogo from "../../../../assets/svg/UpdateMessageLogo/updateMessageLogo";
import MessageView from "../../../../models/messages/MessageView";
import "./style.css";
import UpdateMessageInput from "./UpdateMessageInput/updateMessageInput";

const MessageElement = (message: MessageView) => {
  const messageRef = React.useRef<HTMLInputElement>(null);

  const [messageEdit, setMessageEditStatus] = useState<boolean>(false);
  const [messageContentState, setMessageContentState] = useState<string>(
    message.content
  );

 
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageRef]);

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
        style={message.isIncome ? incomeMessageStyle : outcomeMessageStyle}
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
