import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MessageView from "../../../../models/messages/MessageView";
import "./style.css";

const MessageElement = (message: MessageView) => {
  useEffect(() => {
    console.log(1);
  });

  return (
    <Row>
      <Container
        style={
          message.isReceiver
            ? {
                backgroundColor: "#6998C2",
                border: "5px solid #7694A4",
                color: "#FDFDFA",
              }
            : {
                backgroundColor: "#FDFDFA",
                border: "5px solid #BDBCAC",
                color: "#175A9B",
              }
        }
        className="message-container"
      >
        <Row>
          <Col md={1}>pic</Col>
          <Col md={11}>
            <Row>
              <Col md={4} className="sender-data font-poppins-600">
                {message.userFromFirstName} {message.userFromLastName}
              </Col>
            </Row>
            <Row>
              <Container className="message-content font-poppins-400">
                {message.content}
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
