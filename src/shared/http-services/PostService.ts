import { AxiosResponse } from "axios";
import SearchByTagsRequest from "../../models/tags/request/SearchByTagsRequest";
import PostView from "../../models/posts/PostView";
import MainTagResponse from "../../models/tags/response/MainTagResponse";
import HttpServiceBase from "./HttpServiceBase";


const getPostsByTags = (request: SearchByTagsRequest): Promise<AxiosResponse<PostView>> => {
    return HttpServiceBase.Get<PostView>(`Post/SearchPostsByTags?MainTagId=${request.mainTagId}&SubTagId=${request.subTagId}`
    );
}
  
const getMainTags = (): Promise<AxiosResponse<Array<MainTagResponse>>> => {
  return HttpServiceBase.Get<Array<MainTagResponse>>(`Post/GetMainTags`);
}

const PostService = {
  getPostsByTags,
  getMainTags
}

export default PostService;