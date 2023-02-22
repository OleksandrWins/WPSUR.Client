import { Col, Row } from "react-bootstrap";
import MainWidget from "./MainWidget/mainWidget";
import "./styles.css";
import TopWidget from "./TopWidget/topWidget";

const Widget = () => {
  return (
    <Col className="widgetMenu">
      <Row className="topWidget">
        <TopWidget />
      </Row>
      <Row className="mainWidget" style={{ padding: "40px", color: "white" }}>
        <MainWidget />
      </Row>
      <Row className="bottomWidget" style={{ padding: "40px", color: "white" }}>
        In Progress
      </Row>
    </Col>
  );
};

export default Widget;
