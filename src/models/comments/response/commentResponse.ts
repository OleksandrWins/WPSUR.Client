import BaseUser from "../../users/BaseUser";

interface CommentResponse { 
  id: string;
  content: string;
  createdBy: BaseUser,
  createdDate: Date
}

export default CommentResponse;