import React, { useState } from "react";
import Icon from "./Icon";

import classes from "./FilterForm.module.css";

const FilterForm = ({ gameData, home, imageTop }) => {
  const [period1, setPeriod1] = useState(true);
  const [period2, setPeriod2] = useState(true);
  const [period3, setPeriod3] = useState(true);
  const [showGoals, setShowGoals] = useState(true);
  const [showShots, setShowShots] = useState(true);
  const [showTurnovers, setShowTurnovers] = useState(true);

  const filteredCoordinates = gameData.clickCoordinates.filter((coord) => {
    const periodSelected =
      (period1 && coord.period === 1) ||
      (period2 && coord.period === 2) ||
      (period3 && coord.period === 3);

    if (
      coord.home === home &&
      ((showGoals && coord.type === "goal" && periodSelected) ||
        (showShots && coord.type === "shot" && periodSelected) ||
        (showTurnovers && coord.type === "turnover" && periodSelected))
    ) {
      return true;
    }
    return false;
  });

  //console.log("top:", imageTop);

  const handleCheckboxChange = (checkboxName) => {
    switch (checkboxName) {
      case "period1":
        setPeriod1(!period1);
        break;
      case "period2":
        setPeriod2(!period2);
        break;
      case "period3":
        setPeriod3(!period3);
        break;
      case "showGoals":
        setShowGoals(!showGoals);
        break;
      case "showShots":
        setShowShots(!showShots);
        break;
      case "showTurnovers":
        setShowTurnovers(!showTurnovers);
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.coordinateFormContainer}>
      <div className={classes.periodsContainer}>
        <h3>Periods</h3>
        <label>
          Period 1
          <input
            type="checkbox"
            checked={period1}
            onChange={() => handleCheckboxChange("period1")}
          />
        </label>
        <label>
          Period 2
          <input
            type="checkbox"
            checked={period2}
            onChange={() => handleCheckboxChange("period2")}
          />
        </label>
        <label>
          Period 3
          <input
            type="checkbox"
            checked={period3}
            onChange={() => handleCheckboxChange("period3")}
          />
        </label>
      </div>

      <div className={classes.typesContainer}>
        <h3>Types</h3>
        <label>
          Show Goals
          <input
            type="checkbox"
            checked={showGoals}
            onChange={() => handleCheckboxChange("showGoals")}
          />
        </label>
        <label>
          Show Shots
          <input
            type="checkbox"
            checked={showShots}
            onChange={() => handleCheckboxChange("showShots")}
          />
        </label>
        <label>
          Show Turnovers
          <input
            type="checkbox"
            checked={showTurnovers}
            onChange={() => handleCheckboxChange("showTurnovers")}
          />
        </label>
      </div>

      {filteredCoordinates.map((coord, index) => (
        <Icon
          key={index}
          inmodal={false}
          x={coord.x}
          y={coord.y - gameData.imageTop + imageTop} // dynamically fixing the slipping on y axis
          home={coord.home}
          type={coord.type}
          background={
            coord.home
              ? gameData.homeColors.background
              : gameData.awayColors.background
          }
          textColor={
            coord.home ? gameData.homeColors.color : gameData.awayColors.color
          }
          player={coord.player}
          onClick={() => {}}
        />
      ))}
    </div>
  );
};

export default FilterForm;
