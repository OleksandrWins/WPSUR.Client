import { Col, Container, Row } from "react-bootstrap";
import "./styles.scss";
import PostService from "../../../shared/http-services/PostService";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import MainTagResponse from "../../../models/tags/response/MainTagResponse";
import PostComponent from "./PostComponent/postComponent";
import { Link, useParams } from "react-router-dom";

const MainPageModule = () => {
  const [mainTagsState, setMainTagsState] = useState<Array<MainTagResponse>>(
    []
  );

  useEffect(() => {
    getMainTag();
  }, []);

  const getMainTag = () => {
    PostService.getMainTags()
      .then((response: AxiosResponse<Array<MainTagResponse>>) => {
        setMainTagsState([...response.data]);
      })
      .catch((err: Error) => console.error(err));
  };

  let { mainTagId, subTagId } = useParams();

  const getMainTagDeprecated = () => {
    const mainTagsFromApi = {
      id: mainTagId,
      name: mainTagsState.find(({ id }) => id === mainTagId)?.name,
    };

    return mainTagsFromApi;
  };

  const getSubTags = () => {
    const subTagsInDb = [
      { mainTagId: 1, subTagId: 1, name: "#Cobra" },
      { mainTagId: 1, subTagId: 2, name: "#I AM YOUR FATHER, LUK" },
      { mainTagId: 2, subTagId: 3, name: "#Sad" },
      { mainTagId: 2, subTagId: 4, name: "#Pes Patron" },
      { mainTagId: 3, subTagId: 5, name: "#Sand" },
      { mainTagId: 3, subTagId: 6, name: "#Onion" },
      { mainTagId: 4, subTagId: 7, name: "#Riffle" },
      { mainTagId: 4, subTagId: 8, name: "#Patrik" },
      { mainTagId: 5, subTagId: 9, name: "#Sponge bob" },
      { mainTagId: 5, subTagId: 10, name: "#Cup" },
    ];

    const requiredSubTagsFromApi = subTagsInDb.filter(
      (subTag) => subTag.mainTagId.toString() === mainTagId
    );

    const subTags = requiredSubTagsFromApi.map((subTag) => (
      <Link key={subTag.subTagId} to={`/home/${mainTagId}/${subTag.subTagId}`}>
        {subTag.name}
      </Link>
    ));
    return subTags;
  };

  const getPosts = () => {
    const postsInDb = [
      {
        id: 1,
        mainTagId: 1,
        subTagId: 1,
        title: "Find cobra",
        content: "I'm going to care about it.",
      },
      {
        id: 2,
        mainTagId: 1,
        subTagId: 1,
        title: "Lost cobra",
        content: "IS ANYBODY SEEN MY BAYBE????",
      },
      {
        id: 3,
        mainTagId: 1,
        subTagId: 2,
        title: "Death star",
        content: "How can I fix my pocked death star?",
      },
      {
        id: 4,
        mainTagId: 1,
        subTagId: 2,
        title: "Jedi",
        content: "IS ANYBODY SEEN MY BAYBE????",
      },
      {
        id: 5,
        mainTagId: 2,
        subTagId: 3,
        title: "Vodka",
        content: "Is OVER :(",
      },
      {
        id: 6,
        mainTagId: 2,
        subTagId: 4,
        title: "Dog",
        content: "Have you seen it?",
      },
    ];

    const requiredPosts = postsInDb.filter(
      (post) =>
        post.mainTagId.toString() === mainTagId &&
        post.subTagId.toString() === subTagId
    );

    const posts = requiredPosts.map((post) => (
      <li key={post.id}>
        {post.title}: {post.content}
      </li>
    ));

    return posts;
  };

  return (
    <Col className="main-page-module">
      <Row className="main-tags">
        <Container className="font-poppins-700 main-page-header main-page-content">
          Welcome to the{" "} <span className="main-page-app-name">"Everybody-info".</span>
        </Container>
      </Row>
      <Row className="description">
        <Container className="font-poppins-700 main-page-description main-page-content">
          <Link to={"/info"}>Our application can</Link>
        </Container>
      </Row>
      <Row>
        <Container>
          <PostComponent
            id="A24564EA-36C3-45A1-AA8C-B9F5298B37CB"
            header="Super post header"
            content="Super post content that you can see in our beautiful app."
            mainTag={{
              id: "E9D62ED9-12B0-4825-97E2-C2ADF37B2331",
              content: "Main tag",
            }}
            subTags={[
              {
                id: "9FD17F82-3094-479C-8796-79F00F9F0706",
                content: "Sub tag",
              },
            ]}
            likes={4}
            comments={[
              {
                id: "adfas",
                likes: 3,
                content:
                  "This is a very strange comment from very strange user...",
                createdBy: {
                  id: "ddddd",
                  firstName: "Name",
                  lastName: "Notname",
                },
                createdDate: new Date(),
              },
            ]}
          />
        </Container>
      </Row>
    </Col>
  );
};

export default MainPageModule;
