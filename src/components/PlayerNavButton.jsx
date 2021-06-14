const PlayerNavButton = ({
  className,
  label,
  onPlayerNavClick,
  players,
  to,
}) => {
  const updatePlayerLocation = async () => {
    console.log(players);
    try {
      const outcome = await players.updateOne(
        { username: "PotatoMan" },
        { $set: { location: to } }
      );
      console.log(outcome);
    } catch (err) {
      console.error(err, "location not updated");
    }
  };
  return (
    <button
      onClick={() => {
        onPlayerNavClick(to);
        updatePlayerLocation();
      }}
      className={className}
    >
      {label}
    </button>
  );
};

export default PlayerNavButton;
