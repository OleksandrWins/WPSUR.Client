import { AxiosResponse } from "axios";
import { title } from "process";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router";
import TagElement from "../../../elements/TagElement/tagElement";
import Post from "../../../models/posts/Post";
import SubTag from "../../../models/subTags/subTag";
import MainTagState from "../../../models/tags/MainTagState";
import PostService from "../../../shared/http-services/PostService";
import PostComponent from "../MainPageModule/PostComponent/postComponent";
import "./styles.scss";

const MainTagModule = () => {
  const location = useLocation();

  const [mainTagState, setMainTagState] = useState<MainTagState>({
    id: "",
    title: "",
    body: "",
    subTags: [],
    posts: [],
  });
  const [postElementsState, setPostElementsState] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    console.log(postElementsState);
    setPostElementsState([...mainTagState.posts.map((post: Post) => (
      <PostComponent
        id={post.id}
        header={post.title}
        content={post.body}
        mainTag={{ id: mainTagState.id, title: mainTagState.title }}
        subTags={[...mainTagState.subTags]}
        likes={0}
        comments={post.comments}
        key={mainTagState.posts.indexOf(post)}
      />
    ))])

  }, [mainTagState])

  useEffect(() => {
    console.log();
    PostService.getMainTagState(location.pathname.slice(6)).then(
      (response: AxiosResponse<MainTagState>) => {
        setMainTagState(response.data)}
    ).catch((err: Error) => console.log(err));

  }, []);

  return (
    <Container>
      <Row className="justify-content-center main-tag-state-main-tag-row">
        <Col md={4} className="main-tag-state-title">
          <TagElement isMainTag={true} content={mainTagState.title} />
        </Col>
      </Row>
      <Row className="">
        {mainTagState.subTags.map((subTag) => (
          <Col className="justify-content-center">
            <Row className="main-tag-state-sub-tag">
            <TagElement isMainTag={false} content={subTag.title} />
            </Row>
          </Col>
        ))}
      </Row>
      {postElementsState}
    </Container>
  );
};

export default MainTagModule;
