import React, { useState } from "react";
import classes from "./PlayersTable.module.css";

const PlayersTable = ({
  periods,
  players,
  selectedPlayer,
  clickCoordinates,
  onRowSelect,
  onSort,
}) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("");

  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    onSort(field, sortOrder);
  };

  console.log(players);

  return (
    <table className={classes.tableContainer}>
      <thead>
        <tr>
          <th
            className={sortBy === "jerseyNr" ? classes.highlight : ""}
            onClick={() => handleSort("jerseyNr")}
          >
            Jersey Number
          </th>
          <th
            className={sortBy === "position" ? classes.highlight : ""}
            onClick={() => handleSort("position")}
          >
            Position
          </th>
          <th
            className={sortBy === "name" ? classes.highlight : ""}
            onClick={() => handleSort("name")}
          >
            Name
          </th>
          <th
            className={sortBy === "goal" ? classes.highlight : ""}
            onClick={() => handleSort("goal")}
          >
            Goals
          </th>
          <th
            className={sortBy === "shot" ? classes.highlight : ""}
            onClick={() => handleSort("shot")}
          >
            Shots
          </th>
          <th
            className={sortBy === "turnover" ? classes.highlight : ""}
            onClick={() => handleSort("turnover")}
          >
            Turnovers
          </th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.jerseyNr} onClick={() => onRowSelect(player)}>
            <td>{player.jerseyNr}</td>
            <td>{player.position}</td>
            <td>{player.name}</td>
            <td>{player.goal ? player.goal : 0}</td>
            <td>{player.shot ? player.shot : 0}</td>
            <td>{player.turnover ? player.turnover : 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlayersTable;
