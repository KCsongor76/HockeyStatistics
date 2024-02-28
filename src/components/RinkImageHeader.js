import classes from "./RinkImageHeader.module.css";

import { formatTime } from "../functions/rinkImageFunctions";
import { db } from "../firebase-config";
import { collection, addDoc } from "@firebase/firestore";

const RinkImageHeader = ({ home, away, timeData, globals }) => {
  const gamesCollection = collection(db, "games");

  const finaliseGameSendData = async (gameData) => {
    await addDoc(gamesCollection, gameData);
  };

  return (
    <div className={classes.logosTimers}>
      <div className={classes.logo}>
        <img
          src={globals.logos.home}
          alt=""
          onClick={() =>
            globals.teamIconSwitchHandler(
              globals.logos,
              home.selectedHomeTeam,
              globals.setLogos,
              away.selectedAwayTeam
            )
          }
        ></img>
      </div>

      <div>
        <p>Shots: {home.homeShots}</p>
        <p>Turnovers: {home.homeTurnovers}</p>
      </div>

      <div>
        <p>Period: {timeData.period}</p>
        <p>Time: {formatTime(timeData.time)}</p>
        <p>
          Score: {home.homeGoals}:{away.awayGoals}
        </p>
        <button
          onClick={() => timeData.setIsRunning((prevRunning) => !prevRunning)}
        >
          {timeData.isRunning ? "Stop time" : "Start time"}
        </button>
        {timeData.isGameOver && (
          <button
            onClick={() => {
              globals.finaliseGameHandler(
                globals.championship,
                globals.selectedImage,
                globals.gameType,
                home.homeColors,
                away.awayColors,
                home.selectedHomeTeam,
                away.selectedAwayTeam,
                home.homeGoals,
                away.awayGoals,
                home.homeShots,
                away.awayShots,
                home.homeTurnovers,
                away.awayTurnovers,
                timeData.initialDate,
                globals.clickCoordinates,
                globals.imageTop,
                globals.onFinalisedGame
              );
              const gameData = {
                championship: globals.championship,
                selectedImage: globals.selectedImage,
                gameType: globals.gameType,
                homeColors: home.homeColors,
                awayColors: away.awayColors,
                selectedHomeTeam: home.selectedHomeTeam,
                selectedAwayTeam: away.selectedAwayTeam,
                homeGoals: home.homeGoals,
                awayGoals: away.awayGoals,
                homeShots: home.homeShots,
                awayShots: away.awayShots,
                homeTurnovers: home.homeTurnovers,
                awayTurnovers: away.awayTurnovers,
                initialDate: timeData.initialDate,
                clickCoordinates: globals.clickCoordinates,
                imageTop: globals.imageTop,
                //onFinalisedGame: globals.onFinalisedGame,
              };
              finaliseGameSendData(gameData);
            }}
          >
            Finalise Game
          </button>
        )}
        {timeData.isEndOfPeriod && (
          <button
            onClick={() =>
              timeData.timeAndPeriodHandler(
                timeData.period,
                timeData.setPeriod,
                timeData.setTime,
                globals.gameType,
                timeData.periodCounter,
                timeData.setPeriodCounter,
                timeData.setISEndOfPeriod
              )
            }
          >
            Go to next period
          </button>
        )}
      </div>

      <div>
        <p>Shots: {away.awayShots}</p>
        <p>Turnovers: {away.awayTurnovers}</p>
      </div>

      <div className={classes.logo}>
        <img
          src={globals.logos.away}
          alt=""
          onClick={() =>
            globals.teamIconSwitchHandler(
              globals.logos,
              home.selectedHomeTeam,
              globals.setLogos,
              away.selectedAwayTeam
            )
          }
        ></img>
      </div>
    </div>
  );
};

export default RinkImageHeader;
