import { useHistory } from "react-router-dom";

const PlayerNavButton = (props) => {
  const history = useHistory();
  return (
    <button
      onClick={() => {
        props.onLocationChange();
        history.push(props.to);
      }}
      className={props.className}
    >
      {props?.label}
    </button>
  );
};

export default PlayerNavButton;
