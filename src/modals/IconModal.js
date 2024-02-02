import React, { useState } from "react";
import Modal from "react-modal";

import classes from "./IconModal.module.css";
import IconRow from "../components/IconRow";
import PlayerList from "../components/PlayerList";

Modal.setAppElement("#root"); // Required for accessibility

/**
 * This component is responsible for the whole process of
 * selecting the action and the player.
 * @param {*} param0
 * @returns
 */
const IconModal = ({
  isOpen,
  onRequestClose,
  homeColors,
  awayColors,
  homeTeam,
  awayTeam,
  onIconClick,
}) => {
  const [iconWasClicked, setIconWasClicked] = useState(false);
  const [iconState, setIconState] = useState({});

  const iconClickHandler = (event, { home, type }) => {
    setIconWasClicked(true);
    setIconState({ home, type });
  };

  const playerClickHandler = ({ player, iconState }) => {
    setIconWasClicked(false);
    console.log({ player, iconState });
    onIconClick({ ...iconState, player });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      {!iconWasClicked && (
        <>
          <h2>Which event has occured?</h2>
          <IconRow
            home={true}
            colors={homeColors}
            iconClickHandler={iconClickHandler}
          />
          <IconRow
            home={false}
            colors={awayColors}
            iconClickHandler={iconClickHandler}
          />
        </>
      )}
      {iconWasClicked && (
        <>
          <h2>Which player?</h2>
          <div className={classes.players}>
            {iconState.home && (
              <PlayerList
                team={homeTeam}
                iconState={iconState}
                playerClickHandler={playerClickHandler}
              />
            )}
            {!iconState.home && (
              <PlayerList
                team={awayTeam}
                iconState={iconState}
                playerClickHandler={playerClickHandler}
              />
            )}
          </div>
        </>
      )}
      <button
        onClick={() => {
          setIconWasClicked(false);
          onRequestClose();
        }}
      >
        Close Modal
      </button>
    </Modal>
  );
};

export default IconModal;
