import { Col, Container, Row } from "react-bootstrap";
import WeatherLogo from "../../../../assets/svg/WeatherLogo/weatherLogo";
import EnvironmentTheme from "../../../../shared/EnvironmentTheme/environmentThemeEnum";
import "./styles.css"


interface WeatherWidgetState {
  theme: EnvironmentTheme;
  temprature: number;
}

const WeatherWidget = (props: WeatherWidgetState) => {
  const lightThemeStyles = {
    backgroundColor: "#F2F1E6",
    color: "#486877",
  };

  const darkThemeStyles = {
    backgroundColor: "#6998C2",
    color: "#E5E5E5",
  };

  return (
    <Container
      className="main-widget-child font-poppins-500"
      style={
        props.theme === EnvironmentTheme.Light
          ? lightThemeStyles
          : darkThemeStyles
      }
    >
      <Row>
        <WeatherLogo size={60} theme={props.theme}/>
      </Row>
      <Row >
        <Col md={{span: 4, offset: 4}} style={{fontSize: "200%"}}>
        {props.temprature}°C
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherWidget;
