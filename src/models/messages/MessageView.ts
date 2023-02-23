interface MessageView { 
  userFromFirstName: string;
  userFromLastName:string;
  createdDate: string;
  updatedDate?: Date;
  content: string;
  id: string;
  isIncome: boolean;
  isDelete: boolean;
  addMessagesToDelete: (args: string) => void;
  removeMessageToDelete: (args: string) => void;
} 

export default MessageView;