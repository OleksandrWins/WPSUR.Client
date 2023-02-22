import BaseUser from "../users/BaseUser";

interface Comment { 
  id: string;
  likes: number;
  content: string;
  createdBy: BaseUser;
  createdDate: Date;
}

export default Comment;