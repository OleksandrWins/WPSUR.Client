import { Col, Row } from "react-bootstrap";
import NumberSection from "./NumbersSection/NumberSection";
import './styles.css';

const Widget = () => {

  return(
    <Col className="widgetMenu">
      <Row className="topWidget">

      </Row>
      <Row className="mainWidget">

      </Row>
      <Row className="bottomWidget"> <NumberSection></NumberSection></Row>
    </Col>
  );
}

export default Widget;