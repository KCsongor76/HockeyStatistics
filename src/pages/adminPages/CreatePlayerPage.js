import { useEffect, useState } from "react";

import classes from "./CreatePlayerPage.module.css";
import { createPlayer, getTeamsData } from "../../functions/firebaseFunctions";
import { useNavigate } from "react-router-dom";

const CreatePlayerPage = () => {
  const [playerData, setPlayerData] = useState({
    name: "",
    jerseyNr: 0,
    position: "",
  });

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      playerData.name === "" ||
      playerData.jerseyNr < 1 ||
      playerData.jerseyNr > 99 ||
      playerData.position === ""
    ) {
      alert("Fill in correct values in all fields");
      return;
    }
    try {
      createPlayer(playerData, selectedTeam);

      alert("Player added successfully!");
      setPlayerData({
        name: "",
        jerseyNr: 0,
        position: "",
      });
      setSelectedTeam("");
    } catch (error) {
      console.error("Error adding player: ", error);
      alert("Error adding player. Please try again.");
    }
  };

  useEffect(() => {
    getTeamsData(setTeams);
  }, []);

  console.log(teams);

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Create player</h2>
      <form onSubmit={submitHandler} className={classes.form}>
        <label className={classes.label}>
          Name:
          <input
            type="text"
            value={playerData.name}
            onChange={(event) =>
              setPlayerData((prevData) => {
                return { ...prevData, name: event.target.value };
              })
            }
            className={classes.input}
          />
        </label>
        <label className={classes.label}>
          Jersey Number:
          <input
            type="number"
            value={playerData.jerseyNr}
            onChange={(event) =>
              setPlayerData((prevData) => {
                return { ...prevData, jerseyNr: event.target.value };
              })
            }
            className={classes.input}
          />
        </label>
        <label className={classes.label}>
          Position:
          <select
            value={playerData.position}
            onChange={(event) =>
              setPlayerData((prevData) => {
                return { ...prevData, position: event.target.value };
              })
            }
            className={classes.select}
          >
            <option value="">Select Position</option>
            <option value="F">Forward</option>
            <option value="D">Defender</option>
            <option value="G">Goalie</option>
          </select>
        </label>

        <label className={classes.label}>
          Team:
          <select
            value={selectedTeam}
            onChange={(event) => setSelectedTeam(event.target.value)}
            className={classes.select}
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className={classes.button}>
          Create Player
        </button>
      </form>
      <button className={classes.navButton} onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default CreatePlayerPage;
