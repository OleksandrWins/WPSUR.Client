import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChatView from "../../../../models/chats/ChatView";

class ChatElement extends React.Component<ChatView> {
  constructor(props: ChatView) {
    super(props);
  }

  state: ChatView = {
    userId: "",
    userToName: "",
  };

  render() {
    return (
      <Container>
        <Row>
          <Container>
            <Link to={`${this.props.userId}`}>
              {this.props.userToName}
            </Link>
          </Container>
        </Row>
      </Container>
    );
  }
}

export default ChatElement;
