import "./styles.css";

type SpinnerState = {
  color: string;
  containerSideSize: number;
};

const LoadingSpinner = (props: SpinnerState): JSX.Element => {
  return (
    <div
      className="loader-container"
      style={{
        border: `${(props.containerSideSize / 8).toString()}px solid #f3f3f3`,
        borderTop: `${(props.containerSideSize / 8).toString()}px solid ${
          props.color
        }`,
        width: props.containerSideSize,
        height: props.containerSideSize,
      }}
    ></div>
  );
};

export default LoadingSpinner;
