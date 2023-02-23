import { Container, Row, Col } from "react-bootstrap";
import EnvironmentTheme from "../../../shared/EnvironmentTheme/environmentThemeEnum";
import CurrencyWidget from "./CurrencyWidget/currencyWidget";
import WeatherWidget from "./WeatherWidget/weatherWidget";
import "./styles.css";
import EmergencyWidget from "./EmergencyWidget/emergencyWidget";

const MainWidget = () => {
  return (
    <Container>
      <Row style={{ height: "50%" }}>
        <Col className="main-widget">
          <WeatherWidget theme={EnvironmentTheme.Light} temprature={5} />
        </Col>
        <Col className="main-widget">
          <CurrencyWidget theme={EnvironmentTheme.Light} />
        </Col>
      </Row>
      <Row style={{ height: "50%"}}>
        <Col className="main-widget">
          <WeatherWidget theme={EnvironmentTheme.Dark} temprature={12} />
        </Col>
        <Col className="main-widget">
          <EmergencyWidget theme={EnvironmentTheme.Dark}/>
        </Col>
      </Row>
    </Container>
  );
};

export default MainWidget;
