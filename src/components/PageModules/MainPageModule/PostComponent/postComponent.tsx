import { Container, Row } from "react-bootstrap";
import PostView from "../../../../models/posts/PostView";

const PostComponent = (props: PostView) => { 
  return(
    <Row>
      <Container>
        <Row>
          <Container className="post-tag-bar">
            
          </Container>
        </Row>
        <Row>
          <Container className="post-header">

          </Container>
        </Row>
        <Row>
          <Container className="post-content">

          </Container>
        </Row>
        <Row>
          <Container className="post-reactions">

          </Container>
        </Row>
        <Row>
          <Container className="post-comments">

          </Container>
        </Row>
      </Container>
    </Row>
  );
}

export default PostComponent;