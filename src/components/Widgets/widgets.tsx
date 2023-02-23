import { Col, Row } from "react-bootstrap";
import NumberSection from "./NumbersSection/NumberSection";
import './styles.css';
import MainWidget from "./MainWidget/mainWidget";
import TopWidget from "./TopWidget/topWidget";

const Widget = () => {

  return(
    <Col className="widgetMenu">
      <Row className="topWidget">
        <TopWidget />
      </Row>
      <Row className="mainWidget" style={{ padding: "40px", color: "white" }}>
        <MainWidget />
      </Row>
      <Row className="bottomWidget"> <NumberSection /></Row>
    </Col>
  );
};

export default Widget;
