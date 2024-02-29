import { useEffect, useRef, useState } from "react";
import FilterForm from "./FilterForm";
// import PlayerDataForm from "./PlayerDataForm";

import classes from "./TeamActionDetails.module.css";
import PlayersTable from "./PlayersTable";

const TeamActionDetails = ({ gameData, home }) => {
  const [filteredPlayers, setFilteredPlayers] = useState(
    home
      ? gameData.selectedHomeTeam.playingPlayers
      : gameData.selectedAwayTeam.playingPlayers
  );
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedPeriods, setSelectedPeriods] = useState({
    period1: false,
    period2: false,
    period3: false,
  });

  const handleFilterChange = (selectedPeriods) => {
    setSelectedPeriods(selectedPeriods);
    setFilteredPlayers(
      home
        ? gameData.selectedHomeTeam.playingPlayers
        : gameData.selectedAwayTeam.playingPlayers
    );
  };

  const handleRowSelect = (player) => {
    // Display associated actions based on the selected player
    console.log(player);
    const playerActions = gameData.clickCoordinates.filter(
      (coord) => coord.player.jerseyNr === player.jerseyNr
    );
    console.log(playerActions);
    setSelectedPlayer({ ...player, actions: playerActions }); // array of its action objects: shot/goal/turnovers
  };

  const handleSort = (field, order) => {
    // Sort players based on the selected field and order
    const sortedPlayers = [...filteredPlayers].sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setFilteredPlayers(sortedPlayers);
  };

  const imageRef = useRef(null);
  const [imageTop, setImageTop] = useState(0);

  useEffect(() => {
    const updateImagePosition = () => {
      const imageRect = imageRef.current.getBoundingClientRect();
      setImageTop(imageRect.top + window.scrollY);
    };

    // Update position when the component mounts and on resize/scroll
    window.addEventListener("resize", updateImagePosition);
    window.addEventListener("scroll", updateImagePosition);
    updateImagePosition();

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("resize", updateImagePosition);
      window.removeEventListener("scroll", updateImagePosition);
    };
  }, []);

  return (
    <>
      {home === true && (
        <div className={classes.titleLogo}>
          <p>Home team: {gameData.selectedHomeTeam.name}</p>
          <img src={gameData.selectedHomeTeam.logo} alt="homeLogo" />
        </div>
      )}
      {home === false && (
        <div className={classes.titleLogo}>
          <p>Away team: {gameData.selectedAwayTeam.name}</p>
          <img src={gameData.selectedAwayTeam.logo} alt="awayLogo" />
        </div>
      )}

      <div className={classes.iconStatContainer}>
        <img
          ref={imageRef}
          src={gameData.selectedImage}
          alt="img"
          style={{ width: "800px", height: "500px" }}
        />
        <FilterForm gameData={gameData} home={home} imageTop={imageTop} />
      </div>

      {home === true && (
        <div>
          <p>Goals: {gameData.homeGoals}</p>
          <p>Shots: {gameData.homeShots}</p>
          <p>Turnovers: {gameData.homeTurnovers}</p>
        </div>
      )}
      {home === false && (
        <div>
          <p>Goals: {gameData.awayGoals}</p>
          <p>Shots: {gameData.awayShots}</p>
          <p>Turnovers: {gameData.awayTurnovers}</p>
        </div>
      )}

      <div>
        <p>Player stats</p>
        {/*<PlayerDataForm
          onFilterChange={handleFilterChange}
        />*/}
        <PlayersTable
          periods={selectedPeriods}
          players={filteredPlayers}
          selectedPlayer={selectedPlayer}
          clickCoordinates={gameData.clickCoordinates}
          onRowSelect={handleRowSelect}
          onSort={handleSort}
        />
      </div>
    </>
  );
};

export default TeamActionDetails;
