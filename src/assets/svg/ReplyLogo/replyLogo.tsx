import LogoStateBase from "../../../models/logo/logoStateBase";
import "./styles.scss";

const ReplyLogo = (props: LogoStateBase) => {
  return (
    <svg
      className="reply-logo-svg"
      width={props.size ?? 15}
      height={0.8 * props.size! ?? 12}
      viewBox="0 0 15 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="reply-logo-path"
        d="M9.49442 1.37928C10.4865 2.12056 11.9044 3.37892 13.0325 4.9531C13.4628 5.55347 13.4493 6.35959 12.9992 6.94523C11.819 8.48078 10.3598 9.69097 9.34346 10.3986C9.02452 10.6207 8.60951 10.3816 8.61601 9.99301L8.64726 8.12636L6.14761 8.08452C4.14789 8.05105 0.378541 6.18771 1.26545 1.00183C1.75143 1.84341 2.7234 3.52658 6.22291 3.58515L8.72256 3.62699L8.7538 1.76035C8.76031 1.37176 9.18309 1.14664 9.49442 1.37928Z"
      />
    </svg>
  );
};

export default ReplyLogo;
