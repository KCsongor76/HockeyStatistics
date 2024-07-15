import { useState, useEffect } from "react";

import RinkImage from "../components/RinkImage";
import StartForm from "../components/StartForm";
import DynamicInformativeModal from "../modals/DynamicInformativeModal";
import { formSubmitHandler } from "../functions/startGamePageFunctions";
import { fetchTeamsData } from "../functions/firebaseFunctions";

/**
 * This component is responsible for the "Start Game" page,
 * which contains both the starting form, and the
 * statistics writing page.
 * @param {} param0
 * @returns
 */
const StartGamePage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gameData, setGameData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [teamsLoaded, setTeamsLoaded] = useState(false);

  const [teams, setTeams] = useState({
    allTeams: {},
    euhlTeams: {},
    romTeams: {},
  });

  const updatePlayingPlayers = (team) => {
    if (!team.playingPlayers || team.playingPlayers.length === 0) {
      return {
        ...team,
        playingPlayers: team.players,
      };
    }
    return team;
  };

  useEffect(() => {
    fetchTeamsData(setTeams, setTeamsLoaded);
  }, []);

  // Update gameData to set playingPlayers if they are empty or non-existent

  useEffect(() => {
    if (isSubmitted) {
      setGameData((prevData) => ({
        ...prevData,
        selectedHomeTeam: updatePlayingPlayers(prevData.selectedHomeTeam),
        selectedAwayTeam: updatePlayingPlayers(prevData.selectedAwayTeam),
      }));
    }
  }, [isSubmitted]);

  return (
    <>
      <DynamicInformativeModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />

      {teamsLoaded && !isSubmitted && (
        <StartForm
          onFormSubmit={(gameData) =>
            formSubmitHandler(
              gameData,
              setGameData,
              setIsSubmitted,
              setModalIsOpen
            )
          }
          teams={teams}
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
        />
      )}
    </>
  );
};

export default StartGamePage;
