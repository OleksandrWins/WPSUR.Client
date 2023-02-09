import { Col, Row } from "react-bootstrap";
import NavMenu from "./NavMenu/navMenu";
import './styles.css';
import Logo from "../../assets/svg/Logo/logo";
import UserProfile from "./Profile/userProfile";

const SideBar = () => { 
  return(
    <Col md={3} className="sidebar">
      <Row><Logo/></Row>
      <Row className="nav-menu-row"><NavMenu /></Row>
      <Row></Row>
      <Row className="user-profile-row"><UserProfile /></Row>
    </Col>
  );
}

export default SideBar;