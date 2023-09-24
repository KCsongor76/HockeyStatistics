import React, { useState } from "react";
import Modal from "react-modal";

import classes from "./SelectPlayersModal.module.css";

Modal.setAppElement("#root"); // Required for accessibility

const SelectPlayersModal = ({
  isOpen,
  onRequestClose,
  allHomePlayers,
  allAwayPlayers,
}) => {
  const [playingHomePlayers, setPlayingHomePlayers] = useState(allHomePlayers);
  const [playingAwayPlayers, setPlayingAwayPlayers] = useState(allAwayPlayers);

  const [nonPlayingHomePlayers, setNonPlayingHomePlayers] = useState([]);
  const [nonPlayingAwayPlayers, setNonPlayingAwayPlayers] = useState([]);

  const removeHomePlayerHandler = (event, player) => {
    event.preventDefault();
    setPlayingHomePlayers((prevPlayers) => {
        /* for */
      prevPlayers.filter(
        (prevPlayer) =>
          prevPlayer.jerseyNr + prevPlayer.position !== event.target.value
      );
    });
  };

  const removeAwayPlayerHandler = (event, player) => {
    event.preventDefault();
    console.log(event);
    console.log(event.target);
    console.log(event.target.value);

    console.log(player);
  };

  const addHomePlayerHandler = (event, player) => {
    event.preventDefault();
    console.log(event);
    console.log(event.target);
    console.log(event.target.value);

    console.log(player);
  };

  const addAwayPlayerHandler = (event, player) => {
    event.preventDefault();
    console.log(event);
    console.log(event.target);
    console.log(event.target.value);

    console.log(player);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      <h2>Select the players that are playing: </h2>
      <h3>Remove players from roster</h3>
      <div className={classes.container}>
        <div>
          {playingHomePlayers.map((player) => (
            <div key={player.jerseyNr + player.name + player.position}>
              <p>
                #{player.jerseyNr}: {player.name}
              </p>
              <button
                value={player.jerseyNr + player.position}
                onClick={(event, value) =>
                  removeHomePlayerHandler(event, value)
                }
              >
                -
              </button>
            </div>
          ))}
        </div>

        <div>
          {playingAwayPlayers.map((player) => (
            <div key={player.jerseyNr + player.name + player.position}>
              <p>
                #{player.jerseyNr}: {player.name}
              </p>
              <button
                value={player.jerseyNr + player.position}
                onClick={(event, value) =>
                  removeAwayPlayerHandler(event, value)
                }
              >
                -
              </button>
            </div>
          ))}
        </div>
      </div>

      <h3>Add players to roster</h3>
      <div className={classes.container}>
        <div>
          {nonPlayingHomePlayers.length === 0 && <p>No players found.</p>}
          {nonPlayingHomePlayers.map((player) => (
            <div key={player.jerseyNr + player.name + player.position}>
              <p>
                #{player.jerseyNr}: {player.name}
              </p>
              <button
                value={player.jerseyNr + player.position}
                onClick={(event, value) => addHomePlayerHandler(event, value)}
              >
                +
              </button>
            </div>
          ))}
        </div>

        <div>
          {nonPlayingAwayPlayers.length === 0 && <p>No players found.</p>}
          {nonPlayingAwayPlayers.map((player) => (
            <div key={player.jerseyNr + player.name + player.position}>
              <p>
                #{player.jerseyNr}: {player.name}
              </p>
              <button
                value={player.jerseyNr + player.position}
                onClick={(event, value) => addAwayPlayerHandler(event, value)}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={onRequestClose}>Close Modal</button>
    </Modal>
  );
};

export default SelectPlayersModal;
