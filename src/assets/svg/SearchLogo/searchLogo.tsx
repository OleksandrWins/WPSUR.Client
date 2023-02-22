import { Container } from "react-bootstrap";
import LogoStateBase from "../../../models/logo/logoStateBase";
import "./styles.scss";

const SearchLogo = (props: LogoStateBase) => {
  return (
      <svg
        width={props.size ?? 26}
        height={props.size ?? 26}
        viewBox="0 0 30 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="circle-search-logo-part"
          d="M14.1044 23.5988C21.3417 23.5988 27.2088 18.5399 27.2088 12.2994C27.2088 6.05892 21.3417 1 14.1044 1C6.86704 1 1 6.05892 1 12.2994C1 18.5399 6.86704 23.5988 14.1044 23.5988Z"
        />
        <path className="stick-search-logo-part"
          d="M28.8821 25.0417L23.3801 20.2976"
        />
      </svg>
  );
};

export default SearchLogo;