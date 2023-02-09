import Message from "../messages/Message";

interface Chat { 
  userFrom: string;
  userTo: string;
  messages: Array<Message>;
}

export default Chat;