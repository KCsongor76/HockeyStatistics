import rink_up from "../images/rink/icerink_up.jpg";
import rink_down from "../images/rink/icerink_down.jpg";

import logo_sapi from "../images/logo/sapi.png";
import logo_sportklub from "../images/logo/sccs.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./StartForm.module.css";
import SelectPlayersModal from "../modals/SelectPlayersModal";
import SelectChampionship from "./FormElements/SelectChampionship";
import SelectTeam from "./FormElements/SelectTeam";
import SelectGameType from "./FormElements/SelectGameType";
import SelectImage from "./FormElements/SelectImage";
import Icon from "./Icon";
import SelectIconColor from "./FormElements/SelectIconColor";

/*  
  general structures 
    for players:
      {
        name: string
        jerseyNr: int
        position: string (char(1))
      }

    for teamcolors/iconcolors:
      {
        background: "#..."
        color: "#..." (text-color)
      }
    
    for teams:
      {
        name: string
        players: array[player objects]
        logo: image path
        iconColors: iconcolors object 
      }
*/

const players_Sapi = [
  { name: "Kristó Csongor", jerseyNr: 76, position: "D" },
  { name: "Márton Botond", jerseyNr: 97, position: "F" },
  { name: "Bíró Nándor", jerseyNr: 30, position: "G" },
];

const players_Sportklub = [
  { name: "Salló Alpár", jerseyNr: 55, position: "D" },
  { name: "Becze Tihamér", jerseyNr: 20, position: "F" },
  { name: "Ambrus Levente", jerseyNr: 72, position: "G" },
];
const playersA = [];
const playersB = [];

const defaultIconColors = { background: "#000000", color: "#FFFFFF" };

const team1 = {
  name: "Sapientia U23",
  players: players_Sapi,
  logo: logo_sapi,
  iconColors: { defaultIconColors },
};
const team2 = {
  name: "Sportklub Csíkszereda",
  players: players_Sportklub,
  logo: logo_sportklub,
  iconColors: { defaultIconColors },
};
const teamA = {
  name: "Team A",
  players: playersA,
  iconColors: { defaultIconColors },
};
const teamB = {
  name: "Team B",
  players: playersB,
  iconColors: { defaultIconColors },
};

const teamsROM = [team1, team2];
const teamsEUHL = [teamA, teamB];

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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/");
  };

  const selectPlayersHandler = (event) => {
    event.preventDefault();

    openModal();
  };

  useEffect(() => {
    if (championship === "romanian") {
      setAllTeams(teamsROM);
      setSelectedHomeTeam(teamsROM[0]);
      setSelectedAwayTeam(teamsROM[1]);
    } else if (championship === "euhl") {
      setSelectedHomeTeam(teamsEUHL[0]);
      setSelectedAwayTeam(teamsEUHL[1]);
      setAllTeams(teamsEUHL);
    }
  }, [championship]);

  const selectTeamHandler = (event, home) => {
    // home === true =>  homeTeam
    // home === false => awayTeam

    for (let team of allTeams) {
      if (team.name === event.target.value) {
        if (home) {
          setSelectedHomeTeam(team);
        } else {
          setSelectedAwayTeam(team);
        }
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      championship,
      gameType,
      selectedImage,
      selectedHomeTeam,
      selectedAwayTeam,
      homeColors,
      awayColors,
    };

    onFormSubmit(data);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <SelectChampionship
        championship={championship}
        onChange={setChampionship}
      />

      <SelectTeam
        home={true}
        selectedHomeTeam={selectedHomeTeam}
        selectedAwayTeam={selectedAwayTeam}
        allTeams={allTeams}
        onChange={(event) => selectTeamHandler(event, true)}
      />

      <SelectTeam
        home={false}
        selectedHomeTeam={selectedHomeTeam}
        selectedAwayTeam={selectedAwayTeam}
        allTeams={allTeams}
        onChange={(event) => selectTeamHandler(event, false)}
      />

      <SelectGameType gameType={gameType} onChange={setGameType} />

      <div className={classes.buttons}>
        <button onClick={selectPlayersHandler}>
          Select non playing players
        </button>
      </div>

      {/*TODO: convert into component*/}
      <div className={classes.colors}>
        <div>
          <label>Select home team icon colors</label>
          <div className={classes.colorSelect}>
            <input
              type="color"
              value={homeColors.background}
              onChange={(event) => {
                setHomeColors({
                  ...homeColors,
                  background: event.target.value,
                });
              }}
            />
            <input
              type="color"
              value={homeColors.color}
              onChange={(event) => {
                setHomeColors({ ...homeColors, color: event.target.value });
              }}
            />
          </div>

          <div className={classes.icons}>
            <Icon
              type="shot"
              inmodal={true}
              background={homeColors.background}
              textColor={homeColors.color}
              onClick={() => {}}
            />

            <Icon
              type="turnover"
              inmodal={true}
              background={homeColors.background}
              textColor={homeColors.color}
              onClick={() => {}}
            />

            <Icon
              type="goal"
              inmodal={true}
              background={homeColors.background}
              textColor={homeColors.color}
              onClick={() => {}}
            />
          </div>
        </div>

        <div>
          <label>Select away team icon colors</label>
          <div className={classes.colorSelect}>
            <input
              type="color"
              value={awayColors.background}
              onChange={(event) => {
                setAwayColors({
                  ...awayColors,
                  background: event.target.value,
                });
              }}
            />
            <input
              type="color"
              value={awayColors.color}
              onChange={(event) => {
                setAwayColors({ ...awayColors, color: event.target.value });
              }}
            />
          </div>

          <div className={classes.icons}>
            <Icon
              type="shot"
              inmodal={true}
              background={awayColors.background}
              textColor={awayColors.color}
              onClick={() => {}}
            />

            <Icon
              type="turnover"
              inmodal={true}
              background={awayColors.background}
              textColor={awayColors.color}
              onClick={() => {}}
            />

            <Icon
              type="goal"
              inmodal={true}
              background={awayColors.background}
              textColor={awayColors.color}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      <SelectPlayersModal
        /*TODO: fix bug (mapping array problem)*/ 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        allHomePlayers={selectedHomeTeam.players}
        allAwayPlayers={selectedAwayTeam.players}
      />

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
        <button onClick={navigateHandler}>Go Back</button>
        <button type="submit">Start the game!</button>
      </div>
    </form>
  );
};

export default StartForm;
