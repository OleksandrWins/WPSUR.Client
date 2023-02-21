import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import HomeLogo from "../../../assets/svg/HomeLogo/home";
import { MessageLogo } from "../../../assets/svg/MessagesLogo/messageLogo";
import "../../../styles/fonts/font.css";
import "./styles.css";

const NavMenu = () => {
  const location = useLocation();

  var color = "red";

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
              <HomeLogo />
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
              <MessageLogo />
              <Col>
                <span>Messages</span>
              </Col>
            </Row>
          </NavLink>
        </Container>
      </Row>
      {/* <Row className="row-nav-menu">
        <NavLink id="notification" className="menu-item" to="*">
          <span>Notification</span>
        </NavLink>
      </Row>
      <Row className="row-nav-menu">
        <NavLink id="calendar" className="menu-item" to="*">
          <span>Calendar</span>
        </NavLink>
      </Row> */}
    </Container>
  );
};

export default NavMenu;
