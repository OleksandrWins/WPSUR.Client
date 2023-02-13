import { Col, Container, Row } from "react-bootstrap";
import MessageView from "../../../../models/messages/MessageView";

const MessageElement = (message: MessageView) => {
  return (
    <Row>
      <Container>
        <Row>
          <Col md={4}>
            {message.userToName}
          </Col>
        </Row>
        <Row>
          <Container>
            {message.content}
          </Container>
        </Row>
        <Row>
          <Col md={5}>
            {message.createdDate.toString()}
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default MessageElement;
