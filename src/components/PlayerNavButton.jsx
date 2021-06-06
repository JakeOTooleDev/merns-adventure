const PlayerNavButton = (props) => {
  const updatePlayerLocation = async () => {
    try {
      const outcome = await props.mongodb.current
        .db("mernsAdventure")
        .collection("players")
        .updateOne({ username: "PotatoMan" }, { $set: { location: props.to } });
      console.log(outcome);
    } catch (err) {
      console.error(err, "location not updated");
    }
  };
  return (
    <button
      onClick={() => {
        props.onPlayerNavClick(props.to);
        updatePlayerLocation();
      }}
      className={props.className}
    >
      {props?.label}
    </button>
  );
};

export default PlayerNavButton;
