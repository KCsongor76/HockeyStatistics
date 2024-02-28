import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PrevGame from "../components/PrevGame";

import classes from "./PrevGamesPage.module.css";

import {
  teamsROM,
  teamsEUHL,
  championships,
} from "../functions/startFormFunctions";

const PrevGamesPage = () => {
  // getting the previous games' data (array) from localStorage
  const prevGamesData = JSON.parse(localStorage.getItem("games"));
  if (prevGamesData.length === 0) {
    prevGamesData = [];
  }
  const allTeams = [...teamsROM, ...teamsEUHL];

  /*// Retrieve the cookie value and parse it
  const prevGamesCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("games="));

  const prevGamesData = prevGamesCookie
    ? JSON.parse(prevGamesCookie.split("=")[1])
    : [];
  */

  const navigate = useNavigate();

  const navigateHandler = (index) => {
    navigate(`${index}`);
    // eg: /games/1 - dynamic page, selected game
  };

  const [filter, setFilter] = useState({
    selectedHomeTeam: "",
    selectedAwayTeam: "",
    selectedChampionship: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  // TODO: no prevGamesData -> filter error
  const filteredGames = prevGamesData.filter((prevGame) => {
    const homeTeamMatch =
      filter.selectedHomeTeam === "" ||
      prevGame.selectedHomeTeam.name === filter.selectedHomeTeam;

    const awayTeamMatch =
      filter.selectedAwayTeam === "" ||
      prevGame.selectedAwayTeam.name === filter.selectedAwayTeam;

    const championshipMatch =
      filter.selectedChampionship === "" ||
      prevGame.championship === filter.selectedChampionship;

    return homeTeamMatch && awayTeamMatch && championshipMatch;
  });

  return (
    <>
      <form className={classes.formContainer}>
        <label className={classes.label}>
          Home team:
          <select
            className={classes.select}
            name="selectedHomeTeam"
            value={filter.selectedHomeTeam}
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            {allTeams.map((team, index) => (
              <option key={index} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </label>

        <label className={classes.label}>
          Championship:
          <select
            className={classes.select}
            name="selectedChampionship"
            value={filter.selectedChampionship}
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            {championships.map((championship, index) => (
              <option key={index} value={championship}>
                {championship}
              </option>
            ))}
          </select>
        </label>

        <label className={classes.label}>
          Away team:
          <select
            className={classes.select}
            name="selectedAwayTeam"
            value={filter.selectedAwayTeam}
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            {allTeams.map((team, index) => (
              <option key={index} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </label>
      </form>

      <div className={classes.container}>
        {filteredGames.length > 0 ? (
          filteredGames.map((prevGame) => (
            <PrevGame
              key={prevGame.gameIndex}
              prevGame={prevGame}
              navigateHandler={navigateHandler}
            />
          ))
        ) : (
          <p>No games found.</p>
        )}
      </div>
    </>
  );
};

export default PrevGamesPage;
