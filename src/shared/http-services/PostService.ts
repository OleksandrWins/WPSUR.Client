import { AxiosResponse } from "axios";
import SearchByTagsRequest from "../../models/tags/request/SearchByTagsRequest";
import PostView from "../../models/posts/PostView";
import MainTagResponse from "../../models/tags/response/MainTagResponse";
import HttpServiceBase from "./HttpServiceBase";
import MainTagState from "../../models/tags/MainTagState";


const getPostsByTags = (request: SearchByTagsRequest): Promise<AxiosResponse<PostView>> => {
    return HttpServiceBase.Get<PostView>(`Post/SearchPostsByTags?MainTagId=${request.mainTagId}&SubTagId=${request.subTagId}`
    );
}
  
const getMainTags = (): Promise<AxiosResponse<Array<MainTagResponse>>> => {
  return HttpServiceBase.Get<Array<MainTagResponse>>(`Post/GetMainTags`);
}

const getMainTagState = (mainTagId: string): Promise<AxiosResponse<MainTagState>> => { 
  return HttpServiceBase.Get<MainTagState>(`Post/GetMainTagState?mainTagId=${mainTagId}`);
}

const PostService = {
  getPostsByTags,
  getMainTags,
  getMainTagState,
}

export default PostService;