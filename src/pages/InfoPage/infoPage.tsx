import { Container, Row } from "react-bootstrap";
import "./styles.scss";
const InfoPage = () => {
  return (
    <Container>
      <Row className="create-post-row">
        <Container className="create-post-header info-page-header">
          Welcome to our project!
        </Container>
      </Row>
      <Row className="create-post-row info-page-row">
        <Container className="create-post-form-element create-post-form-element-text info-page-row">
          <span className="font-poppins-600">
            If you also want Moscow to burn, you have chosen the right website.
            <br />On this application you can:{" "}
          </span>
          <br />- Create your own account;
          <br />- chat with your friends;{" "}
          <br />- Create and share you thoughts in the posts;
          <br />- Put likes on and posts and comments;
          <br />- Make an urgent mailing to several people at once;
          <br />- Enjoy the counter of the amount of dead russians;{" "}
        </Container>
      </Row>{" "}
    </Container>
  );
};

export default InfoPage;
