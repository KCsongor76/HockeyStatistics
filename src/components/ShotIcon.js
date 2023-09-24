const ShotIcon = ({ x, y, inmodal }) => {
  let position = inmodal ? "" : "absolute";

  return (
    <div
      style={{
        position: position,
        left: `${x}px`,
        top: `${y}px`,
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        backgroundColor: "red",
      }}
    >
      {/* You can add your icon content here */}
      {
        <p
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          S
        </p>
      }
      {/*<span role="img" aria-label="Icon">
        🏒
    </span>*/}
    </div>
  );
};

export default ShotIcon;
