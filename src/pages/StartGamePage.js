
import { useState } from "react";

import RinkImage from "../components/RinkImage";
import StartForm from "../components/StartForm";

import { formSubmitHandler } from "../functions/startGamePageFunctions";
import DynamicInformativeModal from "../modals/DynamicInformativeModal";

/**
 * This component is responsible for the "Start Game" page,
 * which contains both the starting form, and the
 * statistics writing page.
 * @param {} param0
 * @returns
 */
const StartGamePage = ({ onFinalisedGame }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gameData, setGameData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log(gameData);

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
          selectedImage={gameData.selectedImage}
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
