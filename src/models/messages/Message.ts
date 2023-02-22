interface Message { 
  id: string;
  content: string;
  userFrom: string;
  userTo: string;
  updatedDate?: Date;
  createdDate: Date;
}

export default Message;