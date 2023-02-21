import { Col, Row } from "react-bootstrap";
import './styles.css';
import inProgress from "../../assets/svg/in-progress.png"

const Widget = () => {
  return(
    <Col className="widgetMenu">
      <Row className="topWidget" style={{padding: "40px", color: "white"}}>
      In Progress

      </Row>
      <Row className="mainWidget" style={{padding: "40px", color: "white"}}>
      In Progress

      </Row>
      <Row className="bottomWidget" style={{padding: "40px", color: "white"}}>
      In Progress
      </Row>
    </Col>
  );
}

export default Widget;