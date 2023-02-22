import LikeLogo from "../../../models/logo/LikeLogo";
import "./styles.scss";

const CommentLikeLogo = (props: LikeLogo) => {

  const activeStyle = { 
    fill: "#6DC05F",
    TransitionEvent: "fill 0.6s easy-in-out"
  }

  return (
    <svg
      className="comment-like-svg"
      width={props.size ?? 15}
      height={0.93 * props.size! ?? 14}
      viewBox="0 0 15 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={props.isActive ? activeStyle : {}}
        className="comment-like-hand"
        d="M4.44255 11.3226H3.83002V5.60118H4.44255L6.87498 1.38054C7.09982 0.990409 7.51585 0.75 7.96614 0.75C8.73106 0.75 9.31936 1.42631 9.2134 2.18386L8.97884 3.86071H10.9693C11.8395 3.86071 13.58 4.73094 13.58 6.47141C13.58 8.21188 11.83 12.1928 9.97884 12.1928C7.54218 12.1928 5.45782 11.6127 4.44255 11.3226Z"
      />
      <path
        className="comment-like-sleeve"
        d="M1.08002 5.375C1.08002 4.61561 1.69563 4 2.45502 4V4C3.21441 4 3.83002 4.61561 3.83002 5.375V11.125C3.83002 11.8844 3.21441 12.5 2.45502 12.5V12.5C1.69563 12.5 1.08002 11.8844 1.08002 11.125V5.375Z"
      />
    </svg>
  );
};

export default CommentLikeLogo;
