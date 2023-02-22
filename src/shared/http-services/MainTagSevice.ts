import TagBaseResponse from "../../models/tags/response/TagBaseResponse";
import HttpServiceBase from "./HttpServiceBase";

const findMainTagByTitle = (title: string) => { 
  return HttpServiceBase.Get<Array<TagBaseResponse>>(`Post/findMainTagByTitle?title=${title}`);
}

const MainTagService = { 
  findMainTagByTitle,
}

export default MainTagService;