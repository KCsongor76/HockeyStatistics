import IconModal from "../modals/IconModal";
import Icon from "./Icon";
import classes from "./RinkImageAction.module.css";
import DynamicInformativeModal from "../modals/DynamicInformativeModal";
import { useEffect, useRef, useState } from "react";

/**
 * This component is responsible for rendering
 * the action rink page and handling all actions
 * @param {*} param0
 * @returns
 */
const RinkImageAction = ({ teams, modals, coords, globals, getImageTop }) => {
  const { homeColors, awayColors, selectedHomeTeam, selectedAwayTeam } = teams;

  const { modalIsOpen, setModalIsOpen, gameModalIsOpen, setGameModalIsOpen } =
    modals;

  const {
    singleCoords,
    setSingleCoords,
    clickCoordinates,
    setClickCoordinates,
  } = coords;

  const {
    selectedImage,
    period,
    time,
    iconData,
    setIconData,
    pageSide,
    setPageSide,
    switchPageHandler,
    clickHandler,
  } = globals;

  const imageRef = useRef(null);
  const [imageTop, setImageTop] = useState(0);

  useEffect(() => {
    const updateImagePosition = () => {
      const imageRect = imageRef.current.getBoundingClientRect();
      setImageTop(imageRect.top + window.scrollY);
    };

    // Update position when the component mounts and on resize/scroll
    window.addEventListener("resize", updateImagePosition);
    window.addEventListener("scroll", updateImagePosition);
    updateImagePosition();

    getImageTop(imageTop);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("resize", updateImagePosition);
      window.removeEventListener("scroll", updateImagePosition);
    };
  }, [imageTop, getImageTop]);

  return (
    <div className={classes.container}>
      <div>
        <img
          ref={imageRef}
          src={selectedImage}
          alt="Ice Rink"
          onClick={(event) =>
            clickHandler(event, setModalIsOpen, setSingleCoords)
          }
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
