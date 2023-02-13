import Message from "../messages/Message";

interface Chat { 
  receiverName: string;
  messages: Array<Message>;
}

export default Chat;