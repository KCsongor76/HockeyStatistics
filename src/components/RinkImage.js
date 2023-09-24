import { useEffect, useState } from "react";

import IconModal from "../modals/IconModal";
import Icon from "./Icon";

import classes from "./RinkImage.module.css";
import IconGameModal from "../modals/IconGameModal";

const RinkImage = ({
  championship,
  gameType,
  selectedImage,
  selectedHomeTeam,
  selectedAwayTeam,
  homeColors,
  awayColors,
  onFinalisedGame,
}) => {
  const [clickCoordinates, setClickCoordinates] = useState([]);
  const [pageSide, setPageSide] = useState("left");
  const [singleCoords, setSingleCoords] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gameModalIsOpen, setGameModalIsOpen] = useState(false);

  const [time, setTime] = useState(5); // TODO: back to 20*60
  const [isRunning, setIsRunning] = useState(false);
  const [period, setPeriod] = useState(1);
  const [periodCounter, setPeriodCounter] = useState(1);
  const [isEndOfPeriod, setISEndOfPeriod] = useState(false);

  const [logos, setLogos] = useState({
    home: selectedHomeTeam.logo,
    away: selectedAwayTeam.logo,
  });
  const [iconData, setIconData] = useState({});

  const [isGameOver, setIsGameOver] = useState(false);

  const [homeGoals, setHomeGoals] = useState(0);
  const [awayGoals, setAwayGoals] = useState(0);

  const [homeShots, setHomeShots] = useState(0);
  const [awayShots, setAwayShots] = useState(0);

  const [homeTurnovers, setHomeTurnovers] = useState(0);
  const [awayTurnovers, setAwayTurnovers] = useState(0);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  const initialDate = `${year}-${month}-${day}`;

  const [date, setDate] = useState(initialDate);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openGameModal = () => {
    setGameModalIsOpen(true);
  };

  const closeGameModal = () => {
    setGameModalIsOpen(false);
  };

  const clickHandler = (event) => {
    openModal();
    const x = event.clientX;
    const y = event.clientY;
    setSingleCoords({ x, y });
  };

  const switchPageHandler = (event) => {
    event.preventDefault();
    pageSide === "left" ? setPageSide("right") : setPageSide("left");
  };

  const scoreViewHandler = () => {
    /* tracks the number of goals, shots, turnovers for both teams */
    /* TODO: all/period: this period (all): 15 (26) */
    setHomeGoals(0);
    setHomeShots(0);
    setHomeTurnovers(0);
    setAwayGoals(0);
    setAwayShots(0);
    setAwayTurnovers(0);

    for (let element of clickCoordinates) {
      if (element.home) {
        if (element.type === "goal") {
          setHomeGoals((prevGoals) => {
            return prevGoals + 1;
          });
          setHomeShots((prevShots) => {
            return prevShots + 1;
          });
        } else if (element.type === "shot") {
          setHomeShots((prevShots) => {
            return prevShots + 1;
          });
        } else if (element.type === "turnover") {
          setHomeTurnovers((prevTurnovers) => {
            return prevTurnovers + 1;
          });
        }
      } else {
        if (element.type === "goal") {
          setAwayGoals((prevGoals) => {
            return prevGoals + 1;
          });
          setAwayShots((prevShots) => {
            return prevShots + 1;
          });
        } else if (element.type === "shot") {
          setAwayShots((prevShots) => {
            return prevShots + 1;
          });
        } else if (element.type === "turnover") {
          setAwayTurnovers((prevTurnovers) => {
            return prevTurnovers + 1;
          });
        }
      }
    }
  };

  const gameOver = () => {
    const condition1 =
      !isRunning && time === 0 && period === 3 && homeGoals !== awayGoals;
    const condition2 =
      (period !== 1 || period !== 2 || period !== 3) && homeGoals !== awayGoals;

    if (condition1 || condition2) {
      setIsGameOver(true);
    }
  };

  useEffect(() => {
    let interval;

    scoreViewHandler();
    gameOver();

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (!isRunning || time === 0) {
      clearInterval(interval);
    }

    if (time === 0 && !isRunning) {
      setISEndOfPeriod(true);
    }

    if (isGameOver) {
    }

    return () => clearInterval(interval);
  }, [isRunning, time, isGameOver, clickCoordinates]);

  const startStopTime = () => {
    setIsRunning((prevRunning) => !prevRunning);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const teamIconSwitchHandler = () => {
    if (logos.home === selectedHomeTeam.logo) {
      setLogos({
        home: selectedAwayTeam.logo,
        away: selectedHomeTeam.logo,
      });
    } else {
      setLogos({
        home: selectedHomeTeam.logo,
        away: selectedAwayTeam.logo,
      });
    }
  };

  const timeAndPeriodHandler = () => {
    if (period < 3) {
      setPeriod((prevPeriod) => prevPeriod + 1);
      //setTime(20 * 60);
      setTime(5);
    } else if (gameType === "regular") {
      if (period === 3) {
        setPeriod("OT");
        //setTime(20 * 5);
        setTime(5);
      } else if (period === "OT") {
        setPeriod("SO");
        setTime(1);
      }
    } else if (gameType === "playoff") {
      // const OT = ["OT1", "OT2", "OT3", "OT4", "OT5", "OT6", "OT7"];
      setPeriod("OT" + periodCounter);
      setPeriodCounter((prevCounter) => prevCounter + 1);
      //setTime(20 * 60);
      setTime(5);
    }
    setISEndOfPeriod(false);
  };

  const finaliseGameHandler = () => {
    const data = {
      championship,
      selectedImage,
      gameType,
      homeColors,
      awayColors,
      selectedHomeTeam,
      selectedAwayTeam,
      homeGoals,
      awayGoals,
      homeShots,
      awayShots,
      homeTurnovers,
      awayTurnovers,
      date,
      clickCoordinates,
    };
    onFinalisedGame(data);
  };

  return (
    <>
      <div className={classes.logosTimers}>
        <div className={classes.logo}>
          <img src={logos.home} onClick={teamIconSwitchHandler}></img>
        </div>
        <div>
          <p>Shots: {homeShots}</p>
          <p>Turnovers: {homeTurnovers}</p>
        </div>
        <div>
          <p>Period: {period}</p>
          <p>Time: {formatTime(time)}</p>
          <p>
            Score: {homeGoals}:{awayGoals}
          </p>
          <button onClick={startStopTime}>
            {isRunning ? "Stop time" : "Start time"}
          </button>
          {isGameOver && (
            <button onClick={finaliseGameHandler}>Finalise Game</button>
          )}
          {isEndOfPeriod && (
            <button onClick={timeAndPeriodHandler}>Go to next period</button>
          )}
        </div>
        <div>
          <p>Shots: {awayShots}</p>
          <p>Turnovers: {awayTurnovers}</p>
        </div>
        <div className={classes.logo}>
          <img src={logos.away} onClick={teamIconSwitchHandler}></img>
        </div>
      </div>

      <div className={classes.container}>
        <div>
          <img
            src={selectedImage}
            alt="Ice Rink"
            onClick={clickHandler}
            style={{
              cursor: "pointer",
              width: "100%",
            }}
          />
          <IconModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            homeColors={homeColors}
            awayColors={awayColors}
            homeTeam={selectedHomeTeam}
            awayTeam={selectedAwayTeam}
            onIconClick={(prevData) => {
              setClickCoordinates((prevCoordinates) => [
                ...prevCoordinates,
                { ...singleCoords, ...prevData, period, time },
              ]);
            }}
          />

          <IconGameModal
            isOpen={gameModalIsOpen}
            onRequestClose={closeGameModal}
            iconData={iconData}
          />

          {pageSide === "right" &&
            clickCoordinates.map((coord, index) => (
              <Icon
                key={index}
                inmodal={false}
                x={coord.x}
                y={coord.y}
                home={coord.home}
                type={coord.type}
                background={
                  coord.home ? homeColors.background : awayColors.background
                }
                textColor={coord.home ? homeColors.color : awayColors.color}
                player={coord.player}
                onClick={() => {
                  openGameModal();
                  setIconData({
                    home: coord.home,
                    type: coord.type,
                    player: coord.player.name,
                  });
                }}
              />
            ))}
        </div>
        <button onClick={switchPageHandler}>Switch page</button>
      </div>
    </>
  );
};

export default RinkImage;
