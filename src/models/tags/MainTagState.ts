import Post from "../posts/Post";
import TagBaseResponse from "./response/TagBaseResponse";

interface MainTagState { 
  id: string;
  title: string;
  subTags: Array<TagBaseResponse>;
  posts: Array<Post>
}

export default MainTagState;