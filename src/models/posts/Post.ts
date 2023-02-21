interface Post { 
  id: string;
  title: string;
  body: string;
  mainTag: string;
  subTags: string[];
  createdBy: string;
  updatedDate?: Date;
  createdDate: Date
}

export default Post;