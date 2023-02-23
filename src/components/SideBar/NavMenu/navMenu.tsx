import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import HomeLogo from "../../../assets/svg/HomeLogo/home";
import { MessageLogo } from "../../../assets/svg/MessagesLogo/messageLogo";
import "../../../styles/fonts/font.css";
import MainTagSection from "./MainTagSection/mainTagSection";
import "./styles.css";

const NavMenu = () => {
  const location = useLocation();

  const link: HTMLElement | null = document.getElementById(
    location.pathname.slice(1)
  );

  useEffect(() => {
    if (link === null) {
      return;
    }

    link.className = `active active-${location.pathname.slice(1)}-icon`;
  });

  return (
    <Container className="nav-menu nav-menu-font font-poppins-600">
      <Row className="row-nav-menu">
        <Container>
          <NavLink id="home" to="/home" className="menu-item-home menu-item">
            <Row>
              {/* <HomeLogo /> */}
              <Col>
                <span>Main</span>
              </Col>
            </Row>
          </NavLink>
        </Container>
      </Row>
      <Row className="row-nav-menu">
        <Container className="menu-item-wrap-messages">
          <NavLink
            id="messages"
            className="menu-item-messages menu-item"
            to="/messages"
          >
            <Row>
              {/* <MessageLogo /> */}
              <Col>
                <span>Messages</span>
              </Col>
            </Row>
          </NavLink>
        </Container>
      </Row>
       <Row className="row-nav-menu">
       <Container className="menu-item-wrap-messages">
        <NavLink
          id="emergencyRequest"
          className="menu-item"
          to="/emergencyList"
        >
          <Row>
            <Col>
              <span>Emergency</span>
            </Col>
          </Row>
        </NavLink>
        </Container>
      </Row>
      <Row className="discussed-topics p-0 mt-3">Most discussed topics:</Row>
      <Row className="list-of-topics">
        <Row className="most-discussed-topics-row my-3">
          <MainTagSection />
        </Row>
      </Row>
      <Row>
        <Container className="create-new-post-button">
          <NavLink
            id="create-topic"
            to="/home/create-topic"
            className="menu-item-home menu-item"
          >
            <Button>Add new post</Button>
          </NavLink>
        </Container>
      </Row>
    </Container>
  );
};

export default NavMenu;
