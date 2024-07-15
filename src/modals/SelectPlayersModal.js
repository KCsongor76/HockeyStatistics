import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import classes from "./SelectPlayersModal.module.css";

import {
  removePlayerHandler,
  addPlayerHandler,
  doneHandler,
  resetHandler,
} from "../functions/selectPlayersModalFunctions";
import SelectPlayersList from "../components/SelectPlayersList";

Modal.setAppElement("#root"); // Required for accessibility

/**
 * This component renders a modal, which is responsible for
 * selecting/deselecting players from the starting roster
 * @param {*} param0
 * @returns
 */
const SelectPlayersModal = ({
  isOpen,
  onRequestClose,
  allHomePlayers,
  allAwayPlayers,
  onChange,
}) => {
  // TODO: need to click done to set playingplayers
  const [playingHomePlayers, setPlayingHomePlayers] = useState(allHomePlayers);
  const [playingAwayPlayers, setPlayingAwayPlayers] = useState(allAwayPlayers);

  const [nonPlayingHomePlayers, setNonPlayingHomePlayers] = useState([]);
  const [nonPlayingAwayPlayers, setNonPlayingAwayPlayers] = useState([]);

  const [setSelectedHomeTeam, setSelectedAwayTeam] = onChange;

  const setters = {
    setPlayingHomePlayers,
    setNonPlayingHomePlayers,
    setPlayingAwayPlayers,
    setNonPlayingAwayPlayers,
  };

  const players1 = {
    selectedPlayers: playingHomePlayers,
    playingPlayers: playingHomePlayers,
    nonPlayingPlayers: nonPlayingHomePlayers,
  };
  const players2 = {
    selectedPlayers: playingAwayPlayers,
    playingPlayers: playingAwayPlayers,
    nonPlayingPlayers: nonPlayingAwayPlayers,
  };
  const players3 = {
    selectedPlayers: nonPlayingHomePlayers,
    playingPlayers: playingHomePlayers,
    nonPlayingPlayers: nonPlayingHomePlayers,
  };
  const players4 = {
    selectedPlayers: nonPlayingAwayPlayers,
    playingPlayers: playingAwayPlayers,
    nonPlayingPlayers: nonPlayingAwayPlayers,
  };

  useEffect(() => {
    setPlayingHomePlayers(allHomePlayers);
  }, [allHomePlayers]);

  useEffect(() => {
    setPlayingAwayPlayers(allAwayPlayers);
  }, [allAwayPlayers]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      <h2>Select the players that are playing: </h2>
      <h3>Remove players from roster</h3>
      <div className={classes.container}>
        <SelectPlayersList
          players={players1}
          setters={setters}
          playerHandler={removePlayerHandler}
          home={true}
          color="red"
        />
        <SelectPlayersList
          players={players2}
          setters={setters}
          playerHandler={removePlayerHandler}
          home={false}
          color="red"
        />
      </div>

      <h3>Add players to roster</h3>
      <div className={classes.container}>
        <SelectPlayersList
          players={players3}
          setters={setters}
          playerHandler={addPlayerHandler}
          home={true}
          color="green"
        />
        <SelectPlayersList
          players={players4}
          setters={setters}
          playerHandler={addPlayerHandler}
          home={false}
          color="green"
        />
      </div>

      <button
        onClick={() => {
          resetHandler(
            setPlayingHomePlayers,
            allHomePlayers,
            setPlayingAwayPlayers,
            allAwayPlayers,
            setNonPlayingAwayPlayers,
            setNonPlayingHomePlayers,
            setSelectedHomeTeam,
            setSelectedAwayTeam
          );
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          doneHandler(
            setSelectedHomeTeam,
            playingHomePlayers,
            setSelectedAwayTeam,
            playingAwayPlayers,
            onRequestClose
          );
        }}
      >
        Done
      </button>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default SelectPlayersModal;
