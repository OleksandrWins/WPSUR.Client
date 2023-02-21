interface MessageView { 
  userFromFirstName: string;
  userFromLastName:string;
  createdDate: string;
  updatedDate?: Date;
  content: string;
  id: string;
  isIncome: boolean;
} 

export default MessageView;