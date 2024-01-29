import rink_up from "../images/rink/icerink_up.jpg";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./StartForm.module.css";
import SelectImage from "./FormElements/SelectImage";
import SelectIconColor from "./FormElements/SelectIconColor";

import {
  selectTeamHandler,
  submitHandler,
} from "../functions/startFormFunctions";

import DynamicSelectComponent from "./FormElements/DynamicSelectComponent";

import {
  teamsEUHL,
  teamsROM,
  defaultIconColors,
} from "../functions/startFormFunctions";
import SelectPlayersModal from "../modals/SelectPlayersModal";

const StartForm = ({ onFormSubmit }) => {
  const [championship, setChampionship] = useState("romanian");
  const [gameType, setGameType] = useState("regular");
  const [selectedImage, setSelectedImage] = useState(rink_up);

  const [selectedHomeTeam, setSelectedHomeTeam] = useState(teamsROM[0]);
  const [selectedAwayTeam, setSelectedAwayTeam] = useState(teamsROM[1]);

  const [homeColors, setHomeColors] = useState(defaultIconColors);
  const [awayColors, setAwayColors] = useState(defaultIconColors);

  const [allTeams, setAllTeams] = useState(teamsROM);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Reset everything when the championship changes
    if (championship === "romanian") {
      setAllTeams(teamsROM);
      setSelectedHomeTeam(teamsROM[0]);
      setSelectedAwayTeam(teamsROM[1]);
    } else if (championship === "euhl") {
      setAllTeams(teamsEUHL);
      setSelectedHomeTeam(teamsEUHL[0]);
      setSelectedAwayTeam(teamsEUHL[1]);
    }
    setHomeColors(defaultIconColors);
    setAwayColors(defaultIconColors);
  }, [championship]);

  useEffect(() => {
    setHomeColors(defaultIconColors);
  }, [selectedHomeTeam]);

  useEffect(() => {
    setAwayColors(defaultIconColors);
  }, [selectedAwayTeam]);

  const data = {
    championship,
    gameType,
    selectedImage,
    selectedHomeTeam,
    selectedAwayTeam,
    homeColors,
    awayColors,
  };

  const selectPlayersHandler = (event) => {
    event.preventDefault();
    setModalIsOpen(true);
  };

  console.log(selectedHomeTeam);

  return (
    <form
      className={classes.form}
      onSubmit={(event) => submitHandler(event, data, onFormSubmit)}
    >
      <DynamicSelectComponent
        type="championship"
        championship={championship}
        onChange={setChampionship}
      />

      <DynamicSelectComponent
        type="hometeam"
        home={true}
        selectedHomeTeam={selectedHomeTeam}
        selectedAwayTeam={selectedAwayTeam}
        allTeams={allTeams}
        onChange={(event) =>
          selectTeamHandler(
            event,
            true,
            allTeams,
            setSelectedHomeTeam,
            setSelectedAwayTeam
          )
        }
      />

      <DynamicSelectComponent
        type="awayteam"
        home={false}
        selectedHomeTeam={selectedHomeTeam}
        selectedAwayTeam={selectedAwayTeam}
        allTeams={allTeams}
        onChange={(event) =>
          selectTeamHandler(
            event,
            false,
            allTeams,
            setSelectedHomeTeam,
            setSelectedAwayTeam
          )
        }
      />

      <DynamicSelectComponent
        type="gametype"
        gameType={gameType}
        onChange={setGameType}
      />

      <div className={classes.buttons}>
        <button onClick={selectPlayersHandler}>
          Select non playing players
        </button>
      </div>

      <SelectPlayersModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        allHomePlayers={selectedHomeTeam.players}
        allAwayPlayers={selectedAwayTeam.players}
        onChange={[setSelectedHomeTeam, setSelectedAwayTeam]}
      />

      <div className={classes.colors}>
        <SelectIconColor
          home={true}
          colors={homeColors}
          onChange={setHomeColors}
        />
        <SelectIconColor
          home={false}
          colors={awayColors}
          onChange={setAwayColors}
        />
      </div>

      <div className={classes.imgform}>
        <SelectImage
          selectedImage={selectedImage}
          optionString={"option1"}
          onChange={setSelectedImage}
        />

        <SelectImage
          selectedImage={selectedImage}
          optionString={"option2"}
          onChange={setSelectedImage}
        />
      </div>

      <div className={classes.buttons}>
        <button onClick={() => navigate("/")}>Go Back</button>
        <button type="submit">Start the game!</button>
      </div>
    </form>
  );
};

export default StartForm;
