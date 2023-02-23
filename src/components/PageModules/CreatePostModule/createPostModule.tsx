import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import MessageSendLogo from "../../../assets/svg/MessageSendLogo/messageSendLogo";
import CreatePostRequest from "../../../models/posts/requests/createPostRequest";
import PostService from "../../../shared/http-services/PostService";
import "./styles.scss";

const CreatePostModule = () => {
  const [mainTagInput, setMainTagInput] = useState<string>("");
  const [subTagsInput, setSubTagInput] = useState<string>("");
  const [postContentInput, setPostContentInput] = useState<string>("");
  const [postTitleInput, setPostTitleInput] = useState<string>("");
  const [sendButtonState, setSendButtonState] = useState<string>("Create");

  const createPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let createPostRequest: CreatePostRequest = {
      title: postTitleInput,
      body: postContentInput,
      mainTag: mainTagInput.split(",")[0],
      subTags: subTagsInput.split(","),
    };

    setSendButtonState("Pending");

    PostService.createPost(createPostRequest).then(() => {
      setMainTagInput("");
      setSubTagInput("");
      setPostContentInput("");
      setPostTitleInput("");
      setSendButtonState("Done");
    });
    window.location.reload();
  };

  return (
    <Container>
      <Row className="create-post-row">
        <Col md={2} className="create-post-back-button-background">
          <NavLink id="back" to="/home">
            <Button className="create-post-button">Back</Button>
          </NavLink>
        </Col>
        <Col md={{ span: 8, offset: 2 }} className="create-post-header ">
          Create Post
        </Col>
      </Row>
      <Form onSubmit={(event) => createPost(event)}>
        <Row>
          <Container className="create-post-form">
            <Row className="create-post-row">
              <Container className="create-post-form-element">
                <Row className="justify-content-center">
                  <Container className="create-post-form-element-text">
                    Enter main tag title.
                  </Container>
                </Row>
                <Row className="justify-content-center create-post-input-row">
                  <Form.Control
                    value={mainTagInput}
                    onChange={(event) => setMainTagInput(event.target.value)}
                    className="create-post-input"
                    type="text"
                  />
                </Row>
              </Container>
            </Row>
            <Row className="create-post-row">
              <Container className="create-post-form-element">
                <Row className="justify-content-center">
                  <Container className="create-post-form-element-text">
                    Please write your sab tags titles via ,
                  </Container>
                </Row>
                <Row className="justify-content-center create-post-input-row">
                  <Form.Control
                    value={subTagsInput}
                    onChange={(event) => setSubTagInput(event.target.value)}
                    className="create-post-input"
                    type="text"
                  />
                </Row>
              </Container>
            </Row>
            <Row className="create-post-row">
              <Container className="create-post-form-element">
                <Row className="justify-content-center">
                  <Container className="create-post-form-element-text">
                    Please write your post title.
                  </Container>
                </Row>
                <Row className="justify-content-center create-post-input-row">
                  <Form.Control
                    value={postTitleInput}
                    onChange={(event) => setPostTitleInput(event.target.value)}
                    className="create-post-input"
                    type="text"
                  />
                </Row>
              </Container>
            </Row>
            <Row className="create-post-row">
              <Container className="create-post-form-element">
                <Row className="justify-content-center">
                  <Container className="create-post-form-element-text">
                    Please type your post content.
                  </Container>
                </Row>
                <Row className="justify-content-center create-post-input-row">
                  <Form.Control
                    value={postContentInput}
                    onChange={(event) =>
                      setPostContentInput(event.target.value)
                    }
                    className="create-post-input post-content-input"
                    type="text"
                  />
                </Row>
              </Container>
            </Row>
            <Row className="create-post-row justify-content-center">
              <Container style={{ width: "fit-content" }}>
                <Button
                  type="submit"
                  className="create-post-button create-post-submit-button"
                >
                  {sendButtonState}
                </Button>
              </Container>
            </Row>
          </Container>
        </Row>
      </Form>
    </Container>
  );
};

export default CreatePostModule;
