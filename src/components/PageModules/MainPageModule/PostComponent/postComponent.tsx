import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import MessageSendLogo from "../../../../assets/svg/MessageSendLogo/messageSendLogo";
import PostLikeLogo from "../../../../assets/svg/PostLikeLogo/postLikeLogo";
import TagElement from "../../../../elements/TagElement/tagElement";
import Comment from "../../../../models/comments/comment";
import CreateCommentRequest from "../../../../models/comments/requests/creaeteCommentRequest";
import CommentResponse from "../../../../models/comments/response/commentResponse";
import PostView from "../../../../models/posts/PostView";
import CommentService from "../../../../shared/http-services/CommentService";
import CommentComponent from "./CommentComponent/commentComponent";
import "./styles.css";

const PostComponent = (props: PostView) => {
  const [postState, setPostState] = useState<PostView>(props);
  const [subTagJsxState, setSubTagJsxState] = useState<Array<JSX.Element>>();
  const [contentCommentState, setContentCommentState] = useState<string>("");
  const [commentsJSXState, setCommentsJSXState] = useState<Array<JSX.Element>>(
    []
  );
  const [commentsState, setCommentState] = useState<Comment[]>([]);
  const [isActiveLike, setLikeState] = useState<boolean>(false);

  useEffect(() => {
    setSubTagJsxState([
      ...postState.subTags.map((subTag) => (
        <Col>
            <TagElement
              key={postState.subTags.indexOf(subTag)}
              isMainTag={false}
              content={subTag.title}
            />
        </Col>
      )),
    ]);

    if (!props.comments) {
      return;
    }

    console.log(props);

    console.log(props.comments);

    setCommentState([...commentsState, ...props.comments]);
  }, []);

  useEffect(() => {
    setContentCommentState("");
    setCommentsElementsState(commentsState);
  }, [commentsState]);

  const setCommentsElementsState = (commentState: Comment[]) => {
    setCommentsJSXState([
      ...commentsJSXState,
      ...commentState.map((comment: Comment) => (
        <CommentComponent
          id={comment.id}
          likes={0}
          content={comment.content}
          createdBy={comment.createdBy}
          createdDate={comment.createdDate}
        />
      )),
    ]);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (contentCommentState === "") {
      return;
    }

    console.log(commentsState);

    let createComment: CreateCommentRequest = {
      content: contentCommentState,
      targetPost: props.id,
    };

    console.log(createComment);

    CommentService.createComment(createComment)
      .then((response: AxiosResponse<Comment>) => {
        setCommentState([response.data]);
      })
      .catch((err: Error) => console.log(err));
  };

  return (
    <Row className="post-row">
      <Container className="post">
        <Row className="post-tags-bar">
          <Col className="post-tag-bar">
            <TagElement
              key={1}
              isMainTag={true}
              content={props.mainTag.title}
            />
          </Col>
          {subTagJsxState}
        </Row>
        <Row>
          <Container className="post-header font-poppins-500">
            {props.header}
          </Container>
        </Row>
        <Row>
          <Container className="post-content font-poppins-600">
            {props.content}
          </Container>
        </Row>
        <Row>
          <Col className="post-reactions">
            <Row>
              <Col md={2} className="post-likes">
                <Button
                  className="transparent-button"
                  onClick={() => setLikeState(!isActiveLike)}
                >
                  <PostLikeLogo key={1} isActive={isActiveLike} />
                </Button>
              </Col>
              <Col md={3} className="post-likes-amount font-poppins-600">
                {isActiveLike ? 1 : 0}
              </Col>
            </Row>
          </Col>
          <Col className="post-comment-selection"></Col>
        </Row>
        <Row>
          <Container className="post-comments">
            <Row>{commentsJSXState}</Row>
            <Row>
              <Form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                  onSubmit(event)
                }
              >
                <InputGroup>
                  <Form.Control
                    value={contentCommentState}
                    className="comment-input"
                    type="text"
                    onChange={(event) =>
                      setContentCommentState(event.target.value)
                    }
                  />
                  <Button
                    type="submit"
                    className="transparent-button send-comment-button"
                  >
                    <MessageSendLogo width={1.18 * 20} height={20} />
                  </Button>
                </InputGroup>
              </Form>
            </Row>
          </Container>
        </Row>
      </Container>
    </Row>
  );
};

export default PostComponent;
