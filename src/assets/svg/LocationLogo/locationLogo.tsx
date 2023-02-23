import "./styles.scss"

const LocationLogo = () => {
  return (
    <svg
    className="locaiton-logo-base"
      width="21"
      height="28"
      viewBox="0 0 21 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="location-logo-external-element"
        d="M11.0803 26.9005C13.2825 25.096 21 18.2218 21 10.5C21 4.70101 16.299 0 10.5 0C4.70101 0 0 4.70101 0 10.5C0 18.2218 7.71748 25.096 9.91974 26.9005C10.2628 27.1815 10.7372 27.1815 11.0803 26.9005Z"
      />
      <path
      className="location-logo-internal-element"
        d="M10.5001 14.184C12.8752 14.184 14.8007 12.2586 14.8007 9.88343C14.8007 7.50827 12.8752 5.58282 10.5001 5.58282C8.12491 5.58282 6.19946 7.50827 6.19946 9.88343C6.19946 12.2586 8.12491 14.184 10.5001 14.184Z"
      />
    </svg>
  );
};

export default LocationLogo;
