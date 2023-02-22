import Comment from "../comments/comment";
import TagBaseResponse from "../tags/response/TagBaseResponse";

interface Post { 
  id: string;
  title: string;
  body: string;
  mainTag: TagBaseResponse;
  subTags: TagBaseResponse[];
  likes: number;
  createdBy: string;
  updatedDate?: Date;
  createdDate: Date;
  comments: Comment[]
}

export default Post;