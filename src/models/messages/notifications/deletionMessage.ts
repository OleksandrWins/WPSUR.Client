interface DeletionMessageNotification { 
  receiverId: string;
  senderId: string;
  messageIds: Array<string>;
}

export default DeletionMessageNotification;