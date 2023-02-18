import { useParams, Link } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
import './styles.css';

const MainPageModule = () => {
  let { mainTagId, subTagId } = useParams();

  const getMainTag = () => {
    const mainTagFromApi = { id: mainTagId, name: "#Weapon" }
    return mainTagFromApi;
  }

  const getSubTags = () => {
    const subTagsInDb = [
      { mainTagId: 1, subTagId: 1, name: "#Cobra" }, { mainTagId: 1, subTagId: 2, name: "#I AM YOUR FATHER, LUK" },
      { mainTagId: 2, subTagId: 3, name: "#Sad" }, { mainTagId: 2, subTagId: 4, name: "#Pes Patron" },
      { mainTagId: 3, subTagId: 5, name: "#Sand" }, { mainTagId: 3, subTagId: 6, name: "#Onion" },
      { mainTagId: 4, subTagId: 7, name: "#Riffle" }, { mainTagId: 4, subTagId: 8, name: "#Patrik" },
      { mainTagId: 5, subTagId: 9, name: "#Sponge bob" }, { mainTagId: 5, subTagId: 10, name: "#Cup" },
    ];

    const requiredSubTagsFromApi = subTagsInDb.filter(subTag => subTag.mainTagId.toString() === mainTagId);

    const subTags = requiredSubTagsFromApi.map(subTag => <Link key={subTag.subTagId} to={`/home/${mainTagId}/${subTag.subTagId}`}>{subTag.name}</Link>);
    return subTags;
  }

  const getPosts = () => {
    const postsInDb = [
      { id: 1, mainTagId: 1, subTagId: 1, title: "Find cobra", content: "I'm going to care about it." },
      { id: 2, mainTagId: 1, subTagId: 1, title: "Lost cobra", content: "IS ANYBODY SEEN MY BAYBE????" },
      { id: 3, mainTagId: 1, subTagId: 2, title: "Death star", content: "How can I fix my pocked death star?" },
      { id: 4, mainTagId: 1, subTagId: 2, title: "Jedi", content: "IS ANYBODY SEEN MY BAYBE????" },
      { id: 5, mainTagId: 2, subTagId: 3, title: "Vodka", content: "Is OVER :(" },
      { id: 6, mainTagId: 2, subTagId: 4, title: "Dog", content: "Have you seen it?" },
    ];

    const requiredPosts = postsInDb.filter(post => post.mainTagId.toString() === mainTagId && post.subTagId.toString() === subTagId);

    const posts = requiredPosts.map(post => <li key={post.id}>{post.title}: {post.content}</li>);
    return posts;
  }

  return (
    <Col>
      <p>Main Tags:</p>
      <Row className="main-tags">
        <div>{getMainTag().id} - {getMainTag().name}</div>
      </Row>

      <br></br>

      <p>Sub Tags:</p>
      <Row>
        {getSubTags()}
      </Row>

      <br></br>

      <p>Posts:</p>
      <ul>
        {getPosts()}
      </ul>

      <Row className="main-tags">
        <input placeholder="find more"></input>
      </Row>
      <Row className="main-tags">
        <div> main tags </div>
      </Row>
      <Row className="additional-tags">
        <div> additional tags </div>
      </Row>
      <Row>
        <div>content </div>
      </Row>
    </Col>
  );
}

export default MainPageModule;