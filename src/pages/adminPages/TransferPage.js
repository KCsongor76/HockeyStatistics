import React, { useEffect, useState } from "react";

import classes from "./TransferPage.module.css";
import {
  getAllTeams2,
  transferPlayer,
} from "../../functions/firebaseFunctions";
import { useNavigate } from "react-router-dom";

const TransferPage = () => {
  const [allTeams, setAllTeams] = useState([]);
  const [fromTeam, setFromTeam] = useState(null);
  const [toTeam, setToTeam] = useState(null);
  const [player, setPlayer] = useState(null);
  const navigate = useNavigate();

  const transferHandler = async (event) => {
    event.preventDefault();

    if (
      fromTeam &&
      toTeam &&
      fromTeam.id &&
      toTeam.id &&
      fromTeam !== toTeam &&
      fromTeam.players &&
      player
    ) {
      transferPlayer(
        fromTeam,
        toTeam,
        player,
        setFromTeam,
        setPlayer,
        setAllTeams
      );
    } else {
      alert("Please select valid teams and a player to transfer.");
    }
  };

  const handlePlayerChange = (e) => {
    const selectedPlayer = fromTeam?.players.find(
      (p) => p.name === e.target.value
    );
    setPlayer(selectedPlayer || null);
    console.log("Selected Player:", selectedPlayer);
  };

  useEffect(() => {
    getAllTeams2(setAllTeams);
  }, []);

  return (
    <>
      <form onSubmit={transferHandler} className={classes.form}>
        <label className={classes.label}>From:</label>
        <select
          onChange={(e) =>
            setFromTeam(
              allTeams.find((team) => team.id === e.target.value) || null
            )
          }
          className={classes.select}
        >
          <option value="">Select team</option>
          {allTeams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        <label className={classes.label}>Player</label>
        <select
          onChange={handlePlayerChange}
          value={player?.name || ""}
          className={classes.select}
        >
          <option value="">Select player</option>
          {fromTeam && fromTeam.players
            ? fromTeam.players.map((player, index) => (
                <option value={player.name} key={index}>
                  {player.name}
                </option>
              ))
            : null}
        </select>

        <label className={classes.label}>To:</label>
        <select
          onChange={(e) =>
            setToTeam(
              allTeams.find((team) => team.id === e.target.value) || null
            )
          }
          className={classes.select}
        >
          <option value="">Select team</option>
          {allTeams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        <button type="submit" className={classes.button}>
          Transfer
        </button>
      </form>
      <button className={classes.button} onClick={() => navigate(-1)}>
        Go Back
      </button>
    </>
  );
};

export default TransferPage;
