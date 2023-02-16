interface MessageView { 
  userFromFirstName: string;
  userFromLastName:string;
  createdDate: string;
  updatedDate?: Date;
  content: string;
  id: string;
  isReceiver: boolean;
} 

export default MessageView;