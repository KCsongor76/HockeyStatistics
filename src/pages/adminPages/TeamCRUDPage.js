import React, { useEffect, useState } from "react";
import classes from "./TeamCRUDPage.module.css";
import {
  deleteTeam,
  getAllTeams,
  getChampionships,
} from "../../functions/firebaseFunctions";

import { useNavigate } from "react-router-dom";

const TeamCRUDPage = () => {
  const [allTeams, setAllTeams] = useState([]);
  const [championships, setChampionships] = useState([]);

  const navigate = useNavigate();

  const [filterByChampionship, setFilterByChampionship] = useState("");
  const [searchByName, setSearchByName] = useState("");

  const handleFilterChange = (event) => {
    setFilterByChampionship(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchByName(event.target.value);
  };

  const filteredTeams = allTeams.filter((team) => {
    const isFilteredByChampionship =
      filterByChampionship === "" ||
      team.data().championships.includes(filterByChampionship);

    const isSearchedByName =
      searchByName === "" ||
      team.data().name.toLowerCase().includes(searchByName.toLowerCase());

    return isFilteredByChampionship && isSearchedByName;
  });

  useEffect(() => {
    getAllTeams(setAllTeams);
    getChampionships(setChampionships);
  }, []);

  return (
    <>
      <button className={classes.button} onClick={() => navigate("create")}>
        Create Team
      </button>

      <form className={classes.formContainer}>
        <label className={classes.label}>Filter by championship:</label>
        <select
          className={classes.customSelect}
          value={filterByChampionship}
          onChange={handleFilterChange}
        >
          <option value="" disabled>
            Select championship
          </option>
          {championships.map((championship) => (
            <option key={championship} value={championship}>
              {championship}
            </option>
          ))}
        </select>

        <label className={classes.label}>Search by name:</label>
        <input
          className={classes.textInput}
          type="text"
          value={searchByName}
          placeholder="Search by name"
          onChange={handleSearchChange}
        />
      </form>

      <ul className={classes.container}>
        {filteredTeams
          ? filteredTeams.map((team) => (
              <li key={team.id} className={classes.teamContainer}>
                <span className={classes.teamName}>{team.data().name}</span>
                <div className={classes.teamActions}>
                  <button
                    className={classes.viewButton}
                    onClick={() => navigate(`/handleTeams/${team.id}`)}
                  >
                    View Team
                  </button>
                  <button
                    className={classes.deleteButton}
                    onClick={() => deleteTeam(team.id, allTeams, setAllTeams)}
                  >
                    Delete Team
                  </button>
                </div>
              </li>
            ))
          : null}
      </ul>
    </>
  );
};

export default TeamCRUDPage;
