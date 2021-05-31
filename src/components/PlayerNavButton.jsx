// * https://reactrouter.com/web/api/Hooks/usehistory
// * https://docs.mongodb.com/realm/web/mongodb/#update-a-single-document
import { useHistory } from "react-router-dom";

const PlayerNavButton = (props) => {
  const updatePlayerLocation = async () => {
    try {
      const outcome = await props.mongodb.current
        .db("mernAdventure")
        .collection("player")
        .updateOne({ username: "PotatoMan" }, { $set: { location: props.to } });
      console.log(outcome);
    } catch (err) {
      console.error(err, "location not updated");
    }
  };
  const history = useHistory();
  return (
    <button
      onClick={() => {
        history.push(props.to);
        updatePlayerLocation();
      }}
      className={props.className}
    >
      {props?.label}
    </button>
  );
};

export default PlayerNavButton;
