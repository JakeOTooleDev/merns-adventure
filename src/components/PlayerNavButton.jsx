const PlayerNavButton = ({ className, label, onPlayerNavClick, to }) => {
  // const updatePlayerLocation = async () => {
  //   try {
  //     const outcome = await players.updateOne(
  //       { username: "PotatoMan" },
  //       { $set: { location: to } }
  //     );
  //     console.log("Updated player location:", outcome);
  //   } catch (err) {
  //     console.error("Location not updated:", err);
  //   }
  // };
  return (
    <button
      onClick={() => {
        onPlayerNavClick(to);
      }}
      className={className}
    >
      {label}
    </button>
  );
};

export default PlayerNavButton;
