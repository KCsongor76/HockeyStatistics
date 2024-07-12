import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePlayer, getTeamById } from "../../functions/firebaseFunctions";

import classes from "./HandleTeamPage.module.css";

const HandleTeamPage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getTeamById(teamId, setTeam);
  }, []);

  return team.name ? (
    <div className={classes.container}>
      <h1 className={classes.header}>Handle Team Page</h1>
      <p>{team.name}</p>
      <img src={team.logo} alt={team.name} className={classes.teamLogo} />
      <p>Championship(s): </p>
      <ul className={classes.championshipList}>
        {team.championships.map((championship) => (
          <li key={championship}>{championship}</li>
        ))}
      </ul>

      <p>Players: </p>
      <ul className={classes.playerList}>
        {team.players
          ? team.players.map((player) => (
              <>
                <li>
                  {player.name}
                  <button
                    className={classes.deleteButton}
                    onClick={() => deletePlayer(player, teamId, team, setTeam)}
                  >
                    Delete Player
                  </button>
                </li>
              </>
            ))
          : null}
      </ul>
      <button className={classes.button} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  ) : null;
};

export default HandleTeamPage;
