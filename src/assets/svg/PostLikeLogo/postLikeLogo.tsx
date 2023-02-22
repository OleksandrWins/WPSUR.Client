import LikeLogo from "../../../models/logo/LikeLogo";
import "./styles.scss"


const PostLikeLogo = (props: LikeLogo) => {



  return (
    <svg
      width={1.07 * props.size! ?? 28}
      height={props.size! ?? 26}
      viewBox="0 0 28 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="post-like-svg"
    >
          <path
            className={props.isActive ? "post-like-top" : "post-like-top-disabled"}
            d="M14 5.65797C8.20218 -1.52732 2.08055 3.57814 2 9.0817C2 11.0258 2.53086 12.8873 3.375 14.5958C2.625 8.68021 20.9278 17.4011 25.4175 12.6551C25.7874 11.509 26 10.3119 26 9.0817C26 3.08987 19.7978 -1.52732 14 5.65797Z"
          />
          <path
            className={props.isActive ? "post-like-bottom" : "post-like-bottom-disabled"}
            d="M14 24C16.1853 24 23.3233 19.1428 25.4175 12.6551C20.9278 17.4011 2.625 8.68021 3.375 14.5958C3.42024 14.6874 3.46639 14.7785 3.51339 14.8692C6.28572 20.2172 12.0714 24 14 24Z"
          />
        <path
          className={props.isActive ? "post-like-border-disabled" : "post-like-border"}
          d="M14 5.55718C8.20213 -1.66759 2.08055 3.46592 2 8.99972C2 17.238 11.7057 24 14 24C16.2942 24 26 17.238 26 8.99972C25.9195 3.46592 19.7978 -1.66759 14 5.55718Z"

        />
    </svg>
  );
};

export default PostLikeLogo;
