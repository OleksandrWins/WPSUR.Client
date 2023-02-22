import React, { useState } from "react";
import { Row, Container, Col, Button } from "react-bootstrap";
import CommentLikeLogo from "../../../../../assets/svg/CommentLikeLogo/commentLikeLogo";
import ReplyLogo from "../../../../../assets/svg/ReplyLogo/replyLogo";
import Comment from "../../../../../models/comments/comment";
import "./styles.css";

const CommentComponent = (props: Comment) => {
  const [isLikeActive, setActiveLike] = useState<boolean>(false);
  const [commentState, setCommentState] = useState<Comment>(props);

  return (
    <Row>
      <Container className="comment">
        <Row>
          <Container  className="comment-text">
            <span className="comment-user-name font-poppins-600">
              {commentState.createdBy.firstName} {commentState.createdBy.lastName}
            </span>
            : {commentState.content}
          </Container>
        </Row>
        <Row>
          <Col className="comment-reply font-poppins-600">
            <ReplyLogo />
            <span className="reply-text">Reply</span>
          </Col>
          <Col md={2} className="comment-likes">
            <Row>
              <Col md={5}>
                <Button
                  className="transparent-button"
                  onClick={() => setActiveLike(!isLikeActive)}
                >
                  <CommentLikeLogo isActive={isLikeActive} />
                </Button>
              </Col>
              <Col md={2} className="comment-like-amount font-poppins-600">
                <span>{0 + (isLikeActive ? 1 : 0)}</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default CommentComponent;
