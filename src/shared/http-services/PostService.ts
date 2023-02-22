import { AxiosResponse } from "axios";
import SearchByTagsRequest from "../../models/tags/request/SearchByTagsRequest";
import PostView from "../../models/posts/PostView";
import MainTagResponse from "../../models/tags/response/MainTagResponse";
import HttpServiceBase from "./HttpServiceBase";
import MainTagState from "../../models/tags/MainTagState";
import Post from "../../models/posts/Post";
import TagBaseResponse from "../../models/tags/response/TagBaseResponse";

const getPostsByTags = (request: SearchByTagsRequest): Promise<AxiosResponse<PostView>> => {
    return HttpServiceBase.Get<PostView>(`Post/SearchPostsByTags?MainTagId=${request.mainTagId}&SubTagId=${request.subTagId}`
    );
}
  
const getMainTags = (): Promise<AxiosResponse<Array<TagBaseResponse>>> => {
  return HttpServiceBase.Get<Array<TagBaseResponse>>(`Post/GetMainTags`);
}

const getMainTagState = (mainTagId: string): Promise<AxiosResponse<MainTagState>> => { 
  return HttpServiceBase.Get<MainTagState>(`Post/GetMainTagState?mainTagId=${mainTagId}`);
}

const getPosts = (): Promise<AxiosResponse<Array<Post>>> => { 
  return HttpServiceBase.Get<Array<Post>>(`Post/GetPosts`);
}

const PostService = {
  getPostsByTags,
  getMainTags,
  getMainTagState,
  getPosts,
}

export default PostService;
