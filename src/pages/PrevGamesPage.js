import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PrevGame from "../components/PrevGame";

import classes from "./PrevGamesPage.module.css";

import {
  championships,
} from "../functions/startFormFunctions";

import { db } from "../firebase-config";
import { collection, getDocs } from "@firebase/firestore";

const PrevGamesPage = () => {
  const [allTeams, setAllTeams] = useState([]);
  const [prevGamesData, setPrevGamesData] = useState([]);

  useEffect(() => {
    const fetchTeamsData = async () => {
      const teamsCollection = collection(db, "teams");
      try {
        const data = await getDocs(teamsCollection);
        const allTeamsData = [];

        data.forEach((doc) => {
          const team = doc.data();
          allTeamsData.push(team);
        });

        setAllTeams(allTeamsData);
      } catch (error) {
        console.error("Error fetching teams: ", error);
      }
    };

    const fetchPrevGamesData = async () => {
      try {
        const gamesCollection = collection(db, "games");
        const data = await getDocs(gamesCollection);
        const allGamesData = [];

        data.forEach((doc) => {
          const game = doc.data();
          allGamesData.push(game);
        });

        setPrevGamesData(allGamesData);
      } catch (error) {
        console.error("Error fetching previous games: ", error);
      }
    };
    fetchTeamsData();
    fetchPrevGamesData();
  }, []);

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

  const condition = prevGamesData.length >= 0;
  const filteredGames = condition
    ? prevGamesData.filter((prevGame) => {
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
      })
    : [];

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
          filteredGames.map((prevGame, index) => (
            <PrevGame
              key={index}
              prevGame={prevGame}
              navigateHandler={() => navigateHandler(index)}
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
