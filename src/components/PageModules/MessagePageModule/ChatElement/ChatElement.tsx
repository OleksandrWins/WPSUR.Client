import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ChatView from "../../../../models/chats/ChatView";

class ChatElement extends React.Component<ChatView> {

  constructor(props: ChatView) {
    super(props);
  }

  state: ChatView = {
    userId: '',
  }

  render() {return (
    <Container>
      <Row>
        <Container >{this.props.userId}</Container>
      </Row>
    </Container>
  )}
}

export default ChatElement;