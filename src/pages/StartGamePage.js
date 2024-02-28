import { useState, useEffect } from "react";

import RinkImage from "../components/RinkImage";
import StartForm from "../components/StartForm";

import { formSubmitHandler } from "../functions/startGamePageFunctions";
import DynamicInformativeModal from "../modals/DynamicInformativeModal";

import { db } from "../firebase-config";
import { collection, getDocs } from "@firebase/firestore";

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
  const [teamsLoaded, setTeamsLoaded] = useState(false);

  const [teams, setTeams] = useState({
    allTeams: {},
    euhlTeams: {},
    romTeams: {},
  });

  useEffect(() => {
    const fetchTeamsData = async () => {
      const teamsCollection = collection(db, "teams");
      try {
        const data = await getDocs(teamsCollection);
        const allTeamsData = [];
        const romTeamsData = [];
        const euhlTeamsData = [];

        data.forEach((doc) => {
          const team = doc.data();
          team.championships.forEach((championship) => {
            if (championship === "euhl") {
              euhlTeamsData.push(team);
            } else if (championship === "romanian") {
              romTeamsData.push(team);
            }
          });

          allTeamsData.push(team);
        });

        setTeams({
          allTeams: allTeamsData,
          euhlTeams: euhlTeamsData,
          romTeams: romTeamsData,
        });
        setTeamsLoaded(true);
      } catch (error) {
        console.error("Error fetching teams: ", error);
      }
    };
    fetchTeamsData();
  }, []);

  return (
    <>
      <DynamicInformativeModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />

      {
        // TODO: loading icon?
        teamsLoaded && !isSubmitted && (
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
        )
      }

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
