import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChatView from "../../../../models/chats/ChatView";
import "./style.css";

class ChatElement extends React.Component<ChatView> {
  constructor(props: ChatView) {
    super(props);
  }

  state: ChatView = {
    userId: "",
    userToFirstName: "",
    userToLastName: "",
  };

  render() {
    return (
        <Row>
          <Container className="theme-container">
            <Link className="font-poppins-600 chat-menu-font" to={`${this.props.userId}`}>
              {this.props.userToFirstName} {this.props.userToLastName}
            </Link>
          </Container>
        </Row>
    );
  }
}

export default ChatElement;
