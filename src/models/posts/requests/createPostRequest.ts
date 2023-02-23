interface CreatePostRequest {
  title: string; 
  body: string;
  mainTag: string;
  subTags: Array<string>;
}

export default CreatePostRequest;