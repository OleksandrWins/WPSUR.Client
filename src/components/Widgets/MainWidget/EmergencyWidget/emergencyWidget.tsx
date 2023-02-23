import { Button, Container, Row } from "react-bootstrap";
import EmergencyLogo from "../../../../assets/svg/EmergencyLogo/emergencyLogo";
import EnvironmentTheme from "../../../../shared/EnvironmentTheme/environmentThemeEnum";

interface EmergencyWidgetState { 
  theme: EnvironmentTheme;
}

const EmergencyWidget = (props: EmergencyWidgetState) => {

  const lightThemeStyles = {
    backgroundColor: "#F2F1E6",
    color: "#486877",
  };

  const darkThemeStyles = {
    backgroundColor: "#6998C2",
    color: "#E5E5E5",
  };

  return(
    <Container
    className="main-widget-child font-poppins-500"
    style={
      props.theme === EnvironmentTheme.Light
        ? lightThemeStyles
        : darkThemeStyles
    }
  >
    <Row>
      <Container>
      <Row className="justify-content-center">
        <Button className="transparent-button p-0 m-0" style={{borderRadius: "400px", display: "contents"}}>
          <EmergencyLogo size={60}/>
        </Button>
        </Row>
      </Container>
    </Row>
    <Row>
      <Container style={{textAlign: "center"}}>
        Emergency call
      </Container>
    </Row>
  </Container>
  );
}

export default EmergencyWidget;
