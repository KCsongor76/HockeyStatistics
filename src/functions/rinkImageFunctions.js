export const clickHandler = (event, setModalIsOpen, setSingleCoords) => {
  setModalIsOpen(true);
  // TODO: scrolling/zooming problem - scale/move coordinates on the rinkimage
  // add fix height & width to the rink picture?
  const x = event.clientX;
  const y = event.clientY;
  setSingleCoords({ x, y });
};

export const switchPageHandler = (event, pageSide, setPageSide) => {
  event.preventDefault();
  pageSide === "left" ? setPageSide("right") : setPageSide("left");
};

export const scoreViewHandler = (
  setHomeGoals,
  setHomeShots,
  setHomeTurnovers,
  setAwayGoals,
  setAwayShots,
  setAwayTurnovers,
  clickCoordinates
) => {
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

export const gameOver = (
  isRunning,
  time,
  period,
  homeGoals,
  awayGoals,
  setIsGameOver
) => {
  /*
      TODO: OT/SO goal: stop timer, dont show "next period" button, 
      show "finalise game" button 
    */
  /*
      Regular Season:
        game ends, when:
          period === 3 && !isRunning && homeGoals !== awayGoals
          OR
          (period === 'OT' || period === 'SO') && homeGoals !== awayGoals
          
    */
  const condition1 =
    !isRunning && time === 0 && period === 3 && homeGoals !== awayGoals;
  const condition2 =
    period !== 1 && period !== 2 && period !== 3 && homeGoals !== awayGoals;

  if (condition1 || condition2) {
    setIsGameOver(true);
  }
};

export const formatTime = (time) => {
  // TODO: show hundreds also, when the period ends: 1.26 seconds left -> 00:01.26;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  // time: 16:35
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export const teamIconSwitchHandler = (
  logos,
  selectedHomeTeam,
  setLogos,
  selectedAwayTeam
) => {
  // switch the logos in the upper corners
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

export const timeAndPeriodHandler = (
  period,
  setPeriod,
  setTime,
  gameType,
  periodCounter,
  setPeriodCounter,
  setISEndOfPeriod
) => {
  if (period < 3) {
    setPeriod((prevPeriod) => prevPeriod + 1);
    //setTime(20 * 60);
    setTime(3);
  } else if (gameType === "regular") {
    if (period === 3) {
      setPeriod("OT");
      //setTime(20 * 5);
      setTime(3);
    } else if (period === "OT") {
      setPeriod("SO");
      setTime(1);
    }
  } else if (gameType === "playoff") {
    // const OT = ["OT1", "OT2", "OT3", "OT4", "OT5", "OT6", "OT7"];
    setPeriod("OT" + periodCounter);
    setPeriodCounter((prevCounter) => prevCounter + 1);
    //setTime(20 * 60);
    setTime(3);
  }
  setISEndOfPeriod(false);
};

export const finaliseGameHandler = (
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
  initialDate,
  clickCoordinates,
  onFinalisedGame
) => {
  /* 
      sends up data to parent (StartGamePage -> App), and then the data is sent down 
      to the PrevGamesPage component/page.
    */
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
    initialDate,
    clickCoordinates,
  };
  onFinalisedGame(data);
};
