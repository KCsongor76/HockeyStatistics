import { useState } from "react";
import classes from "./PrevGamesPage.module.css";
import { useNavigate } from "react-router-dom";

const PrevGamesPage = () => {
  // getting the previous games' data (array) from localStorage
  const prevGamesData = JSON.parse(localStorage.getItem("games"));
  console.log(prevGamesData);
  const navigate = useNavigate();

  const navigateHandler = (index) => {
    console.log(index);
    navigate(`${index}`);
    // eg: /games/1 - dynamic page, selected game
  };

  return (
    <>
      <div className={classes.container}>
        {prevGamesData &&
          prevGamesData.map((prevGame) => (
            <div
              className={classes.game}
              onClick={() => navigateHandler(prevGame.gameIndex)}
              key={prevGame.gameIndex}
            >
              <div>
                <img src={prevGame.selectedHomeTeam.logo}></img>
              </div>

              <div>
                <p>{prevGame.date}</p>
                <p>
                  {prevGame.championship === "romanian" &&
                    "Romanian Championship"}
                  {prevGame.championship === "euhl" && "EUHL"}
                </p>
                <p>
                  Score: {prevGame.homeGoals} - {prevGame.awayGoals}
                </p>
              </div>

              <div>
                <img src={prevGame.selectedAwayTeam.logo}></img>
              </div>
            </div>
          ))}
        {!prevGamesData && <p>No games found.</p>}
      </div>
    </>
  );
};

export default PrevGamesPage;
