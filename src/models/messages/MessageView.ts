interface MessageView { 
  userFromName: string;
  userToName: string;
  createdDate: Date;
  updatedDate?: Date;
  content: string;
} 

export default MessageView;