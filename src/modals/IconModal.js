import React, { useState } from "react";
import Modal from "react-modal";

import classes from "./IconModal.module.css";
import Icon from "../components/Icon";

Modal.setAppElement("#root"); // Required for accessibility

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
          <div className={classes.icons}>
            <Icon
              home={true}
              type="shot"
              inmodal={true}
              background={homeColors.background}
              textColor={homeColors.color}
              onClick={iconClickHandler}
            />
            <Icon
              home={true}
              type="turnover"
              inmodal={true}
              background={homeColors.background}
              textColor={homeColors.color}
              onClick={iconClickHandler}
            />
            <Icon
              home={true}
              type="goal"
              inmodal={true}
              background={homeColors.background}
              textColor={homeColors.color}
              onClick={iconClickHandler}
            />
          </div>
          <div className={classes.icons}>
            <Icon
              home={false}
              type="shot"
              inmodal={true}
              background={awayColors.background}
              textColor={awayColors.color}
              onClick={iconClickHandler}
            />
            <Icon
              home={false}
              type="turnover"
              inmodal={true}
              background={awayColors.background}
              textColor={awayColors.color}
              onClick={iconClickHandler}
            />
            <Icon
              home={false}
              type="goal"
              inmodal={true}
              background={awayColors.background}
              textColor={awayColors.color}
              onClick={iconClickHandler}
            />
          </div>
        </>
      )}
      {iconWasClicked && (
        <>
          <h2>Which player?</h2>
          <div className={classes.players}>
            {
              // TODO: select/option?
              // TODO: drag & drop order / most recent order
              iconState.home &&
                homeTeam.players.map((player) => (
                  <div
                    key={player.jerseyNr + player.name + player.position}
                    onClick={() => playerClickHandler({ player, iconState })}
                  >
                    <p>
                      #{player.jerseyNr} {player.name}
                    </p>
                  </div>
                ))
            }
            {!iconState.home &&
              awayTeam.players.map((player) => (
                <div
                  key={player.jerseyNr + player.name + player.position}
                  onClick={() => playerClickHandler({ player, iconState })}
                >
                  <p>
                    #{player.jerseyNr} {player.name}
                  </p>
                </div>
              ))}
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
