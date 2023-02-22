import EnvironmentTheme from "../../../shared/EnvironmentTheme/environmentThemeEnum";
import "./styles.scss";

interface WeatherLogoState {
  theme: EnvironmentTheme;
  size: number;
}

const WeatherLogo = (props: WeatherLogoState) => {
  const lightLogoStyle = {
    fill: "#6998C2",
  };

  const darkLogoStyle = {
    fill: "#F2F1E6",
  };

  return (
    <svg
      viewBox="0 0 105 91"
      xmlns="http://www.w3.org/2000/svg"
      className="weather-logo"
    >
      <circle
        className="weather-logo-circle"
        cx="77.6227"
        cy="26.3439"
        r="25.0304"
      />
      <path
        className="weather-logo-cloud"
        style={
          props.theme === EnvironmentTheme.Light
            ? lightLogoStyle
            : darkLogoStyle
        }
        d="M87.8233 41.6827C87.4622 41.5771 87.1395 41.3724 86.8932 41.0928C86.6469 40.8132 86.4873 40.4703 86.4332 40.1047C85.7869 33.1607 82.732 26.6438 77.7779 21.6407C72.8237 16.6376 66.2699 13.4509 59.2093 12.6118C52.1486 11.7727 45.0079 13.3321 38.9781 17.0299C32.9482 20.7277 28.3936 26.3403 26.0739 32.9319C25.9204 33.2393 25.6803 33.4971 25.3822 33.6751C25.084 33.853 24.7401 33.9436 24.3911 33.9361C21.0284 34.1574 17.743 35.026 14.7226 36.4921C11.7022 37.9583 9.00599 39.9933 6.78781 42.4811C2.308 47.5053 0.0474499 54.0684 0.503444 60.7266C0.959438 67.3848 4.09463 73.5928 9.21931 77.9848C28.4842 94.4952 78.0183 95.7617 97.4604 78.6335C101.456 75.1138 103.996 70.2802 104.6 65.0477C105.204 59.8153 103.83 54.5473 100.738 50.2413C97.6462 45.9354 93.0513 42.8903 87.8233 41.6827Z"
      />
    </svg>
  );
};

export default WeatherLogo;
