import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import BackLogo from "../../../../assets/svg/BackLogo/backLogo";
import SearchLogo from "../../../../assets/svg/SearchLogo/searchLogo";
import MainTagResponse from "../../../../models/tags/response/MainTagResponse";
import TagBaseResponse from "../../../../models/tags/response/TagBaseResponse";
import MainTagService from "../../../../shared/http-services/MainTagSevice";
import PostService from "../../../../shared/http-services/PostService";
import "./styles.css";

const MainTagSection = () => {
  const [mainTagsState, setMainTagsState] = useState<Array<TagBaseResponse>>(
    []
  );
  const [mainTagsView, setMainTagView] = useState<Array<JSX.Element>>([]);
  const [isNeedMore, setNeedMoreState] = useState<boolean>(false);
  const [titleToFind, setTitleState] = useState<string>("");
  const [foundMainTags, setFoundMainTags] = useState<Array<TagBaseResponse>>();
  const [foundMainTagsJSXResult, setMainTagResult] = useState<
    Array<JSX.Element>
  >([]);

  useEffect(() => {
    setMainTagView([
      ...mainTagsState.map((mainTag: TagBaseResponse) => {
        console.log(mainTag);
        return (
          <Link
            key={mainTag.id}
            to={`/home/${mainTag.id}`}
            className="element font-poppins-800"
          >
            {"#" + formatString(mainTag.title)}
          </Link>
        );
      }),
    ]);
  }, [mainTagsState]);

  useEffect(() => {
    if (!foundMainTags) {
      console.error("An error occurred try again.");
      return;
    }

    setMainTagResult([
      ...foundMainTags.map((mainTag) => (
        <Link
          key={mainTag.id}
          to={`/home/${mainTag.id}`}
          className="element font-poppins-800"
        >
          {"#" + formatString(mainTag.title)}
        </Link>
      )),
    ]);
  }, [foundMainTags]);

  useEffect(() => {
    getMainTag();
  }, []);

  const getMainTag = () => {
    PostService.getMainTags().then(
      (response: AxiosResponse<Array<TagBaseResponse>>) => {
        console.log(response.data);
        setMainTagsState([...response.data]);
      }
    );
  };

  const formatString = (str: string): string => {
    return str
      .replace(/(\B)[^ ]*/g, (match) => match.toLowerCase())
      .replace(/^[^ ]/g, (match) => match.toUpperCase());
  };

  const findMainTags = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    MainTagService.findMainTagByTitle(titleToFind)
      .then((response: AxiosResponse<Array<TagBaseResponse>>) => {
        console.log(response.data);
        setFoundMainTags([...response.data]);
      })
      .catch((error: Error) => console.log(error));
  };

  return (
    <div>
      {isNeedMore ? (
        <Container className="main-tag-find-element">
          <Row className="search-topic-form">
            <Form
              onSubmit={(event) => findMainTags(event)}
              className="tag-search-form-background"
            >
              <InputGroup>
                <Button
                  onClick={() => setNeedMoreState(false)}
                  className="transparent-button tag-back-btn"
                >
                  <BackLogo />
                </Button>
                <Form.Control
                  value={titleToFind}
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
          <Row className="main-tag-container main-tag-result">
          {foundMainTagsJSXResult[0] ? foundMainTagsJSXResult : "empty"}
            <Col md={9}
               style={{ width: "110%"}}
            >
            </Col>
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
