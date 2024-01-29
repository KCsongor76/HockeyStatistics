import React, { useState } from "react";
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

const SelectPlayersModal = ({
  isOpen,
  onRequestClose,
  allHomePlayers,
  allAwayPlayers,
  onChange,
}) => {
  const [playingHomePlayers, setPlayingHomePlayers] = useState(allHomePlayers);
  const [playingAwayPlayers, setPlayingAwayPlayers] = useState(allAwayPlayers);

  const [nonPlayingHomePlayers, setNonPlayingHomePlayers] = useState([]);
  const [nonPlayingAwayPlayers, setNonPlayingAwayPlayers] = useState([]);

  const [setSelectedHomeTeam, setSelectedAwayTeam] = onChange;

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
          selectedPlayers={playingHomePlayers}
          playingPlayers={playingHomePlayers}
          playerHandler={removePlayerHandler}
          nonPlayingPlayers={nonPlayingHomePlayers}
          home={true}
          setPlayingHomePlayers={setPlayingHomePlayers}
          setNonPlayingHomePlayers={setNonPlayingHomePlayers}
          setPlayingAwayPlayers={setPlayingAwayPlayers}
          setNonPlayingAwayPlayers={setNonPlayingAwayPlayers}
        />
        <SelectPlayersList
          selectedPlayers={playingAwayPlayers}
          playingPlayers={playingAwayPlayers}
          playerHandler={removePlayerHandler}
          nonPlayingPlayers={nonPlayingAwayPlayers}
          home={false}
          setPlayingHomePlayers={setPlayingHomePlayers}
          setNonPlayingHomePlayers={setNonPlayingHomePlayers}
          setPlayingAwayPlayers={setPlayingAwayPlayers}
          setNonPlayingAwayPlayers={setNonPlayingAwayPlayers}
        />
      </div>

      <h3>Add players to roster</h3>
      <div className={classes.container}>
        <SelectPlayersList
          selectedPlayers={nonPlayingHomePlayers}
          playingPlayers={playingHomePlayers}
          playerHandler={addPlayerHandler}
          nonPlayingPlayers={nonPlayingHomePlayers}
          home={true}
          setPlayingHomePlayers={setPlayingHomePlayers}
          setNonPlayingHomePlayers={setNonPlayingHomePlayers}
          setPlayingAwayPlayers={setPlayingAwayPlayers}
          setNonPlayingAwayPlayers={setNonPlayingAwayPlayers}
        />
        <SelectPlayersList
          selectedPlayers={nonPlayingAwayPlayers}
          playingPlayers={playingAwayPlayers}
          playerHandler={addPlayerHandler}
          nonPlayingPlayers={nonPlayingAwayPlayers}
          home={false}
          setPlayingHomePlayers={setPlayingHomePlayers}
          setNonPlayingHomePlayers={setNonPlayingHomePlayers}
          setPlayingAwayPlayers={setPlayingAwayPlayers}
          setNonPlayingAwayPlayers={setNonPlayingAwayPlayers}
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
