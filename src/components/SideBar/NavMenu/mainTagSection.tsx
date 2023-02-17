import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import './styles.css';

const MainTagSection = () => {
  const getMainTags = () => {
    const dataFromApi = [{ id: 1, name: "#Weapon" }, { id: 2, name: "#Flood" }, { id: 3, name: "#Riffles" }, { id: 4, name: "#Something else" }, { id: 5, name: "#Food" }];

    const mainTagsFromApi = dataFromApi.map(mainTag => <Link key={mainTag.id} to={`/home/${mainTag.id.toString()}`} className="element">{mainTag.name}</Link>);
    return mainTagsFromApi;
  }

  return (
    <Col md={9} className="main-tag-container">
      {getMainTags()}
    </Col>
  );
}

export default MainTagSection;