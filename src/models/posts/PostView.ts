import Comment from "../comments/comment";
import MainTagView from "../tags/MainTagView";
import TagBaseResponse from "../tags/response/TagBaseResponse";

interface PostView {
  id: string;
  header: string;
  content: string;
  mainTag: TagBaseResponse;
  subTags: Array<TagBaseResponse>;
  likes: number;
  comments?: Array<Comment>
}

export default PostView;