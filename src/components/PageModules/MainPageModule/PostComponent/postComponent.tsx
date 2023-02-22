import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import MessageSendLogo from "../../../../assets/svg/MessageSendLogo/messageSendLogo";
import PostLikeLogo from "../../../../assets/svg/PostLikeLogo/postLikeLogo";
import TagElement from "../../../../elements/TagElement/tagElement";
import Comment from "../../../../models/comments/comment";
import PostView from "../../../../models/posts/PostView";
import SubTag from "../../../../models/subTags/subTag";
import CommentComponent from "./CommentComponent/commentComponent";
import "./styles.css";

const PostComponent = (props: PostView) => {
  const [postState, setPostState] = useState<PostView>(props);
  const [contentCommentState, setContentCommentState] = useState<string>("");
  const [commentsState, setCommentState] = useState<Comment[]>(props.comments!);
  const [isActiveLike, setLikeState] = useState<boolean>(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (contentCommentState === "") {
      return;
    }

    setCommentState((prevState) => [
      ...prevState,
      {
        id: "asfefdase",
        content: contentCommentState,
        likes: 5,
        createdBy: { id: "user", firstName: "Name1", lastName: "name2" },
        createdDate: new Date(),
      },
    ]);
  };

  return (
    <Row>
      <Container className="post">
        <Row className="post-tags-bar">
          <Col md={3} className="post-tag-bar">
            <TagElement isMainTag={true} content={props.mainTag.content} />
          </Col>
          {props.subTags.map((subTag: SubTag) => (
            <Col md={3}>
              <TagElement isMainTag={false} content={subTag.content} />
            </Col>
          ))}
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
                <Button className="transparent-button" onClick={() => setLikeState(!isActiveLike)}>
                  <PostLikeLogo isActive={isActiveLike}/>
                </Button>
              </Col>
              <Col md={3} className="post-likes-amount font-poppins-600">
                {isActiveLike ? props.likes + 1 : props.likes}
              </Col>
            </Row>
          </Col>
          <Col className="post-comment-selection"></Col>
        </Row>
        <Row>
          <Container className="post-comments">
            <Row>
              {commentsState.map((comment: Comment) => (
                <CommentComponent
                  id={comment.id}
                  likes={comment.likes}
                  content={comment.content}
                  createdBy={comment.createdBy}
                  createdDate={comment.createdDate}
                />
              ))}
            </Row>
            <Row>
              <Form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                  onSubmit(event)
                }
              >
                <InputGroup>
                  <Form.Control
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
