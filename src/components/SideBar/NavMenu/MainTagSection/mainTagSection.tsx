import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import BackLogo from "../../../../assets/svg/BackLogo/backLogo";
import SearchLogo from "../../../../assets/svg/SearchLogo/searchLogo";
import MainTagResponse from "../../../../models/tags/response/MainTagResponse";
import PostService from "../../../../shared/http-services/PostService";
import "./styles.css";

const MainTagSection = () => {
  const [mainTagsState, setMainTagsState] = useState<Array<MainTagResponse>>(
    []
  );
  const [mainTagsView, setMainTagView] = useState<Array<JSX.Element>>([]);
  const [isNeedMore, setNeedMoreState] = useState<boolean>(false);
  const [titleToFind, setTitleState] = useState<string>("");
  const [foundMainTagsResult, setMainTagResult] = useState<Array<JSX.Element>>(
    []
  );

  useEffect(() => {
    setMainTagView([
      ...mainTagsState.map((mainTag: MainTagResponse) => (
        <Link key={mainTag.id} to={`/home/${mainTag.id}`} className="element font-poppins-800">
          {"#" + formatString(mainTag.name)}
        </Link>
      )),
    ]);
  }, [mainTagsState]);

  useEffect(() => {
    getMainTag();
  }, []);

  const getMainTag = () => {
    PostService.getMainTags().then(
      (response: AxiosResponse<Array<MainTagResponse>>) => {
        setMainTagsState([...response.data]);
      }
    );
  };

  const formatString = (str: string): string => {
    return str
      .replace(/(\B)[^ ]*/g, match => (match.toLowerCase()))
      .replace(/^[^ ]/g, match => (match.toUpperCase()));
  }

  const findMainTags = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //sending response and setting state;
  };

  return (
    <div>
      {isNeedMore ? (
        <Container className="main-tag-find-element">
          <Row>
            <Form
              onSubmit={(event) => findMainTags(event)}
              className="tag-search-form-background"
            >
              <InputGroup>
                <Button onClick={() => setNeedMoreState(false)} className="transparent-button tag-back-btn">
                  <BackLogo />
                </Button>
                <Form.Control
                  onChange={(event) => setTitleState(event.target.value)}
                  placeholder="find more"
                  className="tag-search-input"
                />
                <Button className="transparent-button tag-search-search-logo-button">
                  <SearchLogo />
                </Button>
              </InputGroup>
            </Form>
          </Row>
          <Row>
            <Container>{foundMainTagsResult}</Container>
          </Row>
        </Container>
      ) : (
        <Col md={9} className="main-tag-container">
          {mainTagsView}
          <Row>
            <Container
              onClick={() => setNeedMoreState(true)}
              className="find-more-option"
            >
              find more
            </Container>
          </Row>
        </Col>
      )}
    </div>
  );
};

export default MainTagSection;
