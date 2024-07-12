import React from "react";
import classes from "./PlayerCRUDPage.module.css";
import { useNavigate } from "react-router-dom";

const PlayerCRUDPage = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.buttonContainer}>
      <button className={classes.button} onClick={() => navigate("create")}>
        Create Player
      </button>

      <button className={classes.button} onClick={() => navigate("transfer")}>
        Transfer Player
      </button>
    </div>
  );
};

export default PlayerCRUDPage;
