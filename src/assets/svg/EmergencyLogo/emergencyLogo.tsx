import "./styles.scss"

interface EmergencyLogo { 
  size: number;
}

const EmergencyLogo = (props: EmergencyLogo) => {
  return (
    <svg
      viewBox="0 0 153 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: `${props.size}%`,
        height: `${props.size}%`
      }}

      className="emergency-logo-svg"
    >
      <circle className="emergency-logo-circle" cx="76.5" cy="76.5" r="76.5" />
      <path
        d="M74.7124 26.5622C75.4504 25.0916 77.5496 25.0916 78.2876 26.5622L115.316 100.353C115.984 101.683 115.017 103.25 113.529 103.25H39.4711C37.9831 103.25 37.0162 101.683 37.6836 100.353L74.7124 26.5622Z"
        fill="#E5E5E5"
      />
      <path
        d="M79.952 48.52L79.12 79.56H73.04L72.208 48.52H79.952ZM76.304 93.448C74.9813 93.448 73.872 93 72.976 92.104C72.08 91.208 71.632 90.0987 71.632 88.776C71.632 87.4533 72.08 86.344 72.976 85.448C73.872 84.552 74.9813 84.104 76.304 84.104C77.584 84.104 78.672 84.552 79.568 85.448C80.464 86.344 80.912 87.4533 80.912 88.776C80.912 90.0987 80.464 91.208 79.568 92.104C78.672 93 77.584 93.448 76.304 93.448Z"
        fill="#486877"
      />
    </svg>
  );
};

export default EmergencyLogo;
