import { Col, Container, Form, Row } from "react-bootstrap";
import TagElement from "../../../../elements/TagElement/tagElement";
import PostView from "../../../../models/posts/PostView";
import SubTag from "../../../../models/subTags/subTag";

const PostComponent = (props: PostView) => {

  const onSubmit = () => { 

  }

  return (
    <Row>
      <Container>
        <Row>
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
          <Container className="post-header">{props.header}</Container>
        </Row>
        <Row>
          <Container className="post-content">{props.content}</Container>
        </Row>
        <Row>
          <Col className="post-reactions"></Col>
          <Col className="post-comment-selection"></Col>
        </Row>
        <Row>
          <Container className="post-comments">
            <Form onSubmit={onSubmit}>

            </Form>
          </Container>
        </Row>
      </Container>
    </Row>
  );
};

export default PostComponent;
