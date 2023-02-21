import SubTag from "../subTags/subTag";
import MainTagView from "../tags/MainTagView";

interface PostView { 
  id: string;
  header: string;
  content: string;
  mainTag: MainTagView;
  subTags: Array<SubTag>;
  likes: number;
}

export default PostView;