import IconModal from "../modals/IconModal";
import Icon from "./Icon";
import classes from "./RinkImage.module.css";
import DynamicInformativeModal from "../modals/DynamicInformativeModal";

const RinkImageAction = ({
  homeColors,
  awayColors,
  selectedHomeTeam,
  selectedAwayTeam,
  selectedImage,
  clickHandler,
  setModalIsOpen,
  setSingleCoords,
  modalIsOpen,
  setClickCoordinates,
  singleCoords,
  period,
  time,
  gameModalIsOpen,
  setGameModalIsOpen,
  iconData,
  pageSide,
  clickCoordinates,
  setIconData,
  switchPageHandler,
  setPageSide,
}) => {
  return (
    <div className={classes.container}>
      <div>
        <img
          src={selectedImage}
          alt="Ice Rink"
          onClick={(event) =>
            clickHandler(event, setModalIsOpen, setSingleCoords)
          }
          style={{
            cursor: "pointer",
            width: "100%",
          }}
        />
        <IconModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          homeColors={homeColors}
          awayColors={awayColors}
          homeTeam={selectedHomeTeam}
          awayTeam={selectedAwayTeam}
          onIconClick={(prevData) => {
            setClickCoordinates((prevCoordinates) => [
              ...prevCoordinates,
              { ...singleCoords, ...prevData, period, time },
            ]);
          }}
        />

        <DynamicInformativeModal
          isOpen={gameModalIsOpen}
          onRequestClose={() => setGameModalIsOpen(false)}
          iconData={iconData}
        />

        {pageSide === "right" &&
          clickCoordinates.map((coord, index) => (
            <Icon
              key={index}
              inmodal={false}
              x={coord.x}
              y={coord.y}
              home={coord.home}
              type={coord.type}
              background={
                coord.home ? homeColors.background : awayColors.background
              }
              textColor={coord.home ? homeColors.color : awayColors.color}
              player={coord.player}
              onClick={() => {
                setGameModalIsOpen(true);
                setIconData({
                  home: coord.home,
                  type: coord.type,
                  player: coord.player.name,
                });
              }}
            />
          ))}
      </div>
      <button
        onClick={(event) => switchPageHandler(event, pageSide, setPageSide)}
      >
        Switch page
      </button>
    </div>
  );
};

export default RinkImageAction;
