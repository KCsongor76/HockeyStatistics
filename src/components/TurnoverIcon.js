const TurnoverIcon = ({ x, y, inmodal }) => {
  let position = inmodal ? "" : "absolute";

  return (
    <div
      style={{
        position: position,
        left: `${x}px`,
        top: `${y}px`,
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
          T
        </p>
      }
      {/*<span role="img" aria-label="Icon">
          🏒
      </span>*/}
    </div>
  );
};

export default TurnoverIcon;
