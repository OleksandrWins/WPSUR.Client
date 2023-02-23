import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import EnvironmentTheme from "../../../../shared/EnvironmentTheme/environmentThemeEnum";
import "./styles.css";

interface CurrencyWidgetState {
  theme: EnvironmentTheme;
}

interface Currency {
  euro: number;
  dollar: number;
}

const CurrencyWidget = (props: CurrencyWidgetState) => {
  const [currency, setCurrency] = useState<Currency>({
    euro: 39.68,
    dollar: 36.78,
  });

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
      className="main-widget-child font-poppins-600 currency-widget"
      style={
        props.theme === EnvironmentTheme.Light
          ? lightThemeStyles
          : darkThemeStyles
      }
    >
      <Row>
        <Container id="currency-parent">
          <span className="currency-symbol">$</span>
          <span id="currency-child">{currency.dollar}₴</span>
        </Container>
      </Row>
      <Row>
        <Container id="currency-parent">
          <span className="currency-symbol">€</span>
          <span id="currency-child">{currency.euro}₴</span>
        </Container>
      </Row>
    </Container>
  );
};

export default CurrencyWidget;
