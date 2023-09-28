import rink_up from "../images/rink/icerink_up.jpg";
import rink_down from "../images/rink/icerink_down.jpg";
import { useState } from "react";

import RinkImage from "../components/RinkImage";
import StartForm from "../components/StartForm";

let image = rink_up;
/*
  generates a form where everything can be selected to set the game up.
  after form submission: generates the gamepage
*/
const StartGamePage = ({ onFinalisedGame }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gameData, setGameData] = useState({});

  const formSubmitHandler = ({
    championship,
    gameType,
    selectedImage,
    selectedHomeTeam,
    selectedAwayTeam,
    homeColors,
    awayColors,
  }) => {
    if (selectedImage === "option1") {
      image = rink_down;
    } else {
      image = rink_up;
    }

    if (selectedHomeTeam !== selectedAwayTeam) {
      setGameData({
        championship,
        gameType,
        selectedImage,
        selectedHomeTeam,
        selectedAwayTeam,
        homeColors,
        awayColors,
      });
      setIsSubmitted(true);
    } else {
      console.log("You can't choose the same team against each other!");
      // TODO: insert modal instead of console.log
    }
  };

  const coordDataHandler = (coordData) => {
    /*
      gets all the data from the game after it's finished, 
      lifts the state(gameData) up to the App component
    */
    onFinalisedGame(coordData);
  };

  return (
    <>
      {!isSubmitted && <StartForm onFormSubmit={formSubmitHandler} />}
      {isSubmitted && (
        <RinkImage
          championship={gameData.championship}
          gameType={gameData.gameType}
          selectedImage={image}
          selectedHomeTeam={gameData.selectedHomeTeam}
          selectedAwayTeam={gameData.selectedAwayTeam}
          homeColors={gameData.homeColors}
          awayColors={gameData.awayColors}
          onFinalisedGame={coordDataHandler}
        />
      )}
    </>
  );
};

export default StartGamePage;
