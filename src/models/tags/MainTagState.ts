import Comment from "../comments/comment";
import Post from "../posts/Post";
import TagBaseResponse from "./response/TagBaseResponse";

interface MainTagState { 
  id: string;
  body: string;
  title: string;
  subTags: Array<TagBaseResponse>;
  posts: Array<Post>;
}

export default MainTagState;