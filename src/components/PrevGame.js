import classes from "../pages/PrevGamesPage.module.css";

const PrevGame = ({ prevGame, navigateHandler }) => {
  return (
    <div
      className={classes.game}
      onClick={() => navigateHandler(prevGame.gameIndex)}
      key={prevGame.gameIndex}
    >
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
    </div>
  );
};

export default PrevGame;
