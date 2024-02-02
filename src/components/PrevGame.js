import classes from "./PrevGame.module.css";

/**
 * This component is responsible for displaying a
 * saved game, and redirecting to the dynamic/unique
 * detailed page with all the statistics about the game.
 * @param {*} param0
 * @returns
 */
const PrevGame = ({ prevGame, navigateHandler }) => {
  return (
    <div
      className={classes.game}
      onClick={() => navigateHandler(prevGame.gameIndex)}
      key={prevGame.gameIndex}
    >
      <div>{prevGame.selectedHomeTeam.name}</div>

      <div>
        <img src={prevGame.selectedHomeTeam.logo} alt="homelogo"></img>
      </div>

      <div>
        <p>{prevGame.date}</p>
        <p>
          {prevGame.championship === "romanian" && "Romanian Championship"}
          {prevGame.championship === "euhl" && "EUHL"}
        </p>
        <p>
          Score: {prevGame.homeGoals} - {prevGame.awayGoals}
        </p>
      </div>

      <div>
        <img src={prevGame.selectedAwayTeam.logo} alt="awaylogo"></img>
      </div>

      <div>{prevGame.selectedAwayTeam.name}</div>
    </div>
  );
};

export default PrevGame;
