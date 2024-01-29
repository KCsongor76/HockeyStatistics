import rink_up from "../images/rink/icerink_up.jpg";
import { useState } from "react";

import RinkImage from "../components/RinkImage";
import StartForm from "../components/StartForm";

import { formSubmitHandler } from "../functions/startGamePageFunctions";
import DynamicInformativeModal from "../modals/DynamicInformativeModal";

let image = rink_up;
/**
 * generates a form where everything can be selected to set the game up. After form submission: generates the gamepage
 * @param {*} param0
 * @returns
 */
const StartGamePage = ({ onFinalisedGame }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gameData, setGameData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <DynamicInformativeModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />

      {!isSubmitted && (
        <StartForm
          onFormSubmit={(gameData) =>
            formSubmitHandler(
              gameData,
              image,
              setGameData,
              setIsSubmitted,
              setModalIsOpen
            )
          }
        />
      )}

      {isSubmitted && (
        <RinkImage
          championship={gameData.championship}
          gameType={gameData.gameType}
          selectedImage={image}
          selectedHomeTeam={gameData.selectedHomeTeam}
          selectedAwayTeam={gameData.selectedAwayTeam}
          homeColors={gameData.homeColors}
          awayColors={gameData.awayColors}
          onFinalisedGame={(coordData) => onFinalisedGame(coordData)} // sends the coordData up to the App
        />
      )}
    </>
  );
};

export default StartGamePage;
