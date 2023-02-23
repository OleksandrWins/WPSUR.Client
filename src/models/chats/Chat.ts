import Message from "../messages/Message";
import { ChatUser } from "../users/ChatUser";

interface Chat { 
  sender: ChatUser;
  receiver: ChatUser;
  messages: Array<Message>;
}

export default Chat;