import { useEffect, useState } from "react";

import {
  clickHandler,
  switchPageHandler,
  scoreViewHandler,
  gameOver,
  teamIconSwitchHandler,
  timeAndPeriodHandler,
  finaliseGameHandler,
} from "../functions/rinkImageFunctions";
import RinkImageHeader from "./RinkImageHeader";
import RinkImageAction from "./RinkImageAction";

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

  const [time, setTime] = useState(3); // TODO: back to 20*60
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
  // date: 2023-09-27

  useEffect(() => {
    /* 
    TODO: when additional button shows up, dont move the page
    eg. "Go to next period button show up under the "Start/Stop time" button,
    and it pushes down rink image
    solution: styling?

    TODO: 
      bugs: period 3, game ends, it still shows "Go to next period"
    */
    let interval;

    scoreViewHandler(
      setHomeGoals,
      setHomeShots,
      setHomeTurnovers,
      setAwayGoals,
      setAwayShots,
      setAwayTurnovers,
      clickCoordinates
    );
    gameOver(isRunning, time, period, homeGoals, awayGoals, setIsGameOver);

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

    return () => clearInterval(interval);
  }, [
    isRunning,
    time,
    isGameOver,
    clickCoordinates,
    awayGoals,
    homeGoals,
    period,
  ]);

  console.log(selectedHomeTeam);

  const rinkImageHeaderProps = {
    home: {
      homeColors: homeColors,
      selectedHomeTeam: selectedHomeTeam,
      homeGoals: homeGoals,
      homeShots: homeShots,
      homeTurnovers: homeTurnovers,
    },
    away: {
      awayColors: awayColors,
      selectedAwayTeam: selectedAwayTeam,
      awayGoals: awayGoals,
      awayShots: awayShots,
      awayTurnovers: awayTurnovers,
    },
    timeData: {
      time: time,
      setTime: setTime,
      isRunning: isRunning,
      setIsRunning: setIsRunning,
      isGameOver: isGameOver,
      isEndOfPeriod: isEndOfPeriod,
      setISEndOfPeriod: setISEndOfPeriod,
      initialDate: initialDate,
      period: period,
      setPeriod: setPeriod,
      periodCounter: periodCounter,
      setPeriodCounter: setPeriodCounter,
      timeAndPeriodHandler: timeAndPeriodHandler,
    },
    globals: {
      championship: championship,
      selectedImage: selectedImage,
      gameType: gameType,
      clickCoordinates: clickCoordinates,
      onFinalisedGame: onFinalisedGame,
      teamIconSwitchHandler: teamIconSwitchHandler,
      finaliseGameHandler: finaliseGameHandler,
      logos: logos,
      setLogos: setLogos,
    },
  };

  const rinkImageActionProps = {
    teams: {
      homeColors: homeColors,
      awayColors: awayColors,
      selectedHomeTeam: selectedHomeTeam,
      selectedAwayTeam: selectedAwayTeam,
    },
    modals: {
      modalIsOpen: modalIsOpen,
      setModalIsOpen: setModalIsOpen,
      gameModalIsOpen: gameModalIsOpen,
      setGameModalIsOpen: setGameModalIsOpen,
    },
    coords: {
      singleCoords: singleCoords,
      setSingleCoords: setSingleCoords,
      clickCoordinates: clickCoordinates,
      setClickCoordinates: setClickCoordinates,
    },
    globals: {
      selectedImage: selectedImage,
      period: period,
      time: time,
      iconData: iconData,
      setIconData: setIconData,
      pageSide: pageSide,
      setPageSide: setPageSide,
      switchPageHandler: switchPageHandler,
      clickHandler: clickHandler,
    },
  };

  return (
    <>
      <RinkImageHeader
        home={rinkImageHeaderProps.home}
        away={rinkImageHeaderProps.away}
        timeData={rinkImageHeaderProps.timeData}
        globals={rinkImageHeaderProps.globals}
      />

      <RinkImageAction
        homeColors={homeColors}
        awayColors={awayColors}
        selectedHomeTeam={selectedHomeTeam}
        selectedAwayTeam={selectedAwayTeam}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        gameModalIsOpen={gameModalIsOpen}
        setGameModalIsOpen={setGameModalIsOpen}
        singleCoords={singleCoords}
        setSingleCoords={setSingleCoords}
        clickCoordinates={clickCoordinates}
        setClickCoordinates={setClickCoordinates}
        selectedImage={selectedImage}
        period={period}
        time={time}
        iconData={iconData}
        setIconData={setIconData}
        pageSide={pageSide}
        setPageSide={setPageSide}
        switchPageHandler={switchPageHandler}
        clickHandler={clickHandler}
        /*teams={rinkImageActionProps.teams}
        modals={rinkImageActionProps.modals}
        coords={rinkImageActionProps.coords}
        globals={rinkImageActionProps.globals}*/
      />
    </>
  );
};

export default RinkImage;
