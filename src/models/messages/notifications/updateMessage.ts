interface UpdateMessageNotification { 
  receiverId: string; 
  senderId: string; 
  messageId: string;
  content: string;
  updatedDate: Date;
}

export default UpdateMessageNotification;