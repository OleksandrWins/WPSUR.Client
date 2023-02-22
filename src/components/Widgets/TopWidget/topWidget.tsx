import { useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import LocationLogo from "../../../assets/svg/LocationLogo/locationLogo";
import SettingsLogo from "../../../assets/svg/SettingsLogo/settingsLogo";
import "./styles.css";

interface LinkModel {
  website: string;
  name: string;
}

interface CityState {
  name: string;
  state: string;
}

const TopWidget = () => {
  const [links, setLinksState] = useState<LinkModel[]>([
    { website: "https://ukraine-helpers.com/", name: "help for ukrainians" },
    {
      website: "https://www.dtek-kem.com.ua/ua/shutdowns",
      name: "lights off schedule",
    },
  ]);

  const [currentCity, setCity] = useState<CityState>({
    name: "Kyiv",
    state: "The city is calm. No missile attacks are expected",
  });

  return (
    <Container className="top-widget">
      <Row>
        <Col className="useful-links top-widget-text-header">
          <Row>
            <Container className="font-poppins-600">
              <span>Useful links:</span>
            </Container>
          </Row>
          <Row>
            <Container className="link top-widget-content-text background-top-widget font-poppins-600">
              {links.map((link: LinkModel) => {
                return (
                  <Row>
                    <Container>
                      <Link to={link.website}>{link.name}</Link>
                    </Container>
                  </Row>
                );
              })}
            </Container>
          </Row>
        </Col>
        <Col className="location-information">
          <Row>
            <Col md={2}>
              <LocationLogo />
            </Col>
            <Col className="top-widget-text-header font-poppins-600" md={8}>
              {currentCity.name}
            </Col>
          </Row>
          <Row>
            <Container className="background-top-widget font-poppins-600 top-widget-content-text top-widget-city-state">
              {currentCity.state}
            </Container>
          </Row>
        </Col>
      </Row>
      <div className="top-widget-settings-button">
        <SettingsLogo />
      </div>
    </Container>
  );
};

export default TopWidget;
