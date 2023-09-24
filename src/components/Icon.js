const Icon = ({
  x,
  y,
  home,
  type,
  inmodal,
  background,
  textColor,
  player,
  onClick,
}) => {
  let position = inmodal ? "" : "absolute";
  let text;

  const width = inmodal ? 50 : 20;
  const height = inmodal ? 50 : 20;
  const fontSize = inmodal ? 18 : 10;

  const backgroundStyle = {
    width: `${width}px`,
    height: `${height}px`,
    position: position,
    left: `${x - width / 2}px`,
    top: `${y - height / 2}px`,
    backgroundColor: background,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: type === "shot" ? "50%" : "0%",
    clipPath:
      type === "turnover"
        ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" // Square
        : type === "goal"
        ? "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" // Hexagon
        : "none", // Default shape (no clip path)
  };

  const textStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: "bold",
    color: textColor,
  };

  if (type === "shot") {
    text = "S";
  } else if (type === "turnover") {
    text = "T";
  } else if (type === "goal") {
    text = "G";
  }

  return (
    <div
      style={backgroundStyle}
      onClick={(event) => onClick(event, { home, type })}
    >
      {<p style={textStyle}>{text}</p>}
      {/*<span role="img" aria-label="Icon">
          🏒
      </span>*/}
    </div>
  );
};

export default Icon;
