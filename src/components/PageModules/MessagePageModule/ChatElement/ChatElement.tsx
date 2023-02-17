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
    receiverId: "",
    receiverFirstName: "",
    receiverLastName: "",
    receiverEmail: ""
  };

  render() {
    return (
        <Row>
          <Container className="theme-container">
            <Link className="font-poppins-600 chat-menu-font" to={`${this.props.receiverId}`}>
              {this.props.receiverFirstName} {this.props.receiverLastName}
            </Link>
          </Container>
        </Row>
    );
  }
}

export default ChatElement;
