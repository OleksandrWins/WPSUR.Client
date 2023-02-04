import { Col, Container, Row } from 'react-bootstrap';
import './styles.css';

const MainPageModule = () => {
  return(
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