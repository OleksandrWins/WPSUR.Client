import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router";
import TagElement from "../../../elements/TagElement/tagElement";
import MainTagState from "../../../models/tags/MainTagState";
import PostService from "../../../shared/http-services/PostService";

const MainTagModule = () => {
  const location = useLocation();

  const [mainTagState, setMainTagState] = useState<MainTagState>({
    id: "",
    title: "",
    subTags: [],
    posts: [],
  });

  useEffect(() => {
    console.log();
    PostService.getMainTagState(location.pathname.slice(6)).then(
      (response: AxiosResponse<MainTagState>) => setMainTagState(response.data)
    );
  }, [location.pathname.slice(6)]);

  return (
    <Container>
      <Row className="justify-content-center main-tag-state-main-tag-row">
        <Col md={4} className="main-tag-state-title">
          <TagElement isMainTag={true} content={mainTagState.title} />
        </Col>
      </Row>
      <Row>
        {mainTagState.subTags.map((subTag) => (<Col><TagElement isMainTag={false} content={subTag.title} /></Col>))}
      </Row>
      <Row>
        <Col>
        </Col>
      </Row>
    </Container>
  );
};

export default MainTagModule;
