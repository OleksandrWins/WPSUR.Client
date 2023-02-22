import CreateCommentRequest from "../../models/comments/requests/creaeteCommentRequest";
import CommentResponse from "../../models/comments/response/commentResponse";
import BaseUser from "../../models/users/BaseUser";
import HttpServiceBase from "./HttpServiceBase";

const createComment = (createComment: CreateCommentRequest) => {
  return HttpServiceBase.Post<CreateCommentRequest, CommentResponse>(createComment, `Comment/createComment`);
}

const CommentService = { 
  createComment,
}

export default CommentService;