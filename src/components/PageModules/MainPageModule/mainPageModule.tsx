import { Col, Container, Row } from "react-bootstrap";
import "./styles.scss";
import PostService from "../../../shared/http-services/PostService";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import PostComponent from "./PostComponent/postComponent";
import { Link } from "react-router-dom";
import Post from "../../../models/posts/Post";

const MainPageModule = () => {
  const [mainPostState, setMainPostState] = useState<Array<Post>>([]);
  const [mainPostJSXState, setMainPostJsxState] = useState<Array<JSX.Element>>(
    []
  );

  useEffect(() => {
    setMainPostJsxState([
      ...mainPostState.map((post) => {
        console.log(post.comments);
        return (
        <PostComponent
          id={post.id}
          header={post.title}
          content={post.body}
          mainTag={post.mainTag}
          subTags={post.subTags}
          likes={post.likes}
          comments={post.comments}
          key={mainPostState.indexOf(post)}
        />
      )}),
    ]);
  }, [mainPostState]);

  useEffect(() => {
    getMainTag();
  }, []);

  const getMainTag = () => {
    PostService.getPosts()
      .then((response: AxiosResponse<Array<Post>>) => {
        console.log(response.data);
        setMainPostState([...response.data]);
      })
      .catch((err: Error) => console.error(err));
  };

  return (
    <Col className="main-page-module">
      <Row className="main-tags">
        <Container className="font-poppins-700 main-page-header main-page-content">
          Welcome to the{" "}
          <span className="main-page-app-name">"Everybody-info".</span>
        </Container>
      </Row>
      <Row className="description">
        <Container className="font-poppins-700 main-page-description main-page-content">
          <Link to={"/info"}>Our application is capable</Link>
        </Container>
      </Row>
      <Row>
        <Container>{mainPostJSXState}</Container>
      </Row>
    </Col>
  );
};

export default MainPageModule;
