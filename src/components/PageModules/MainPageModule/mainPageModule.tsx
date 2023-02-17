import { Col, Container, Row } from 'react-bootstrap';
import './styles.css';

const MainPageModule = () => {
  return(
    /*<Container>
      <Row>
        <Col>1 of 3</Col>
        <Col xs={6}>2 of 3 (wider)</Col>
        <Col>3 of 3</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col xs={5}>2 of 3 (wider)</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>*/
    <div>
  <Row className="main-tags">
    <div> main tags </div>
  </Row>
  <Row className="additional-tags">
    <div> additional tags </div>
  </Row>
  <Row>
   <div>content </div>
  </Row>
</div>
  );
}

export default MainPageModule;