import BaseUser from "../users/User";

interface Comment { 
  id: string;
  likes: number;
  content: string;
  createdBy: BaseUser;
  createdDate: Date;
}

export default Comment;