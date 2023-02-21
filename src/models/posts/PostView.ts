interface PostView { 
  id: string;
  content: string;
  mainTag: Array<string>;
  subTags: Array<string>;
  likes: number;
}

export default PostView;