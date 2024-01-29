import classes from "./RinkImageHeader.module.css";

import { formatTime } from "../functions/rinkImageFunctions";

const RinkImageHeader = ({ home, away, timeData, globals }) => {
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
            onClick={() =>
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
                globals.onFinalisedGame
              )
            }
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
