import { useNavigate, useParams } from "react-router-dom";

import TeamActionDetails from "../components/TeamActionDetails";
import { useState } from "react";

const GameDetailPage = () => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/games");
    // going back
  };

  const params = useParams();
  const allGames = JSON.parse(localStorage.getItem("games"));
  const game = allGames.filter(
    (game) => parseInt(params.gameId) === parseInt(game.gameIndex)
  ); // selecting the corresponding game data with the id/index

  // game = [{...}] - array with only one element
  const gameData = game[0];
  console.log("outer:", gameData.imageTop);

  /*const params = useParams();

  // Retrieve the cookie value and parse it
  const allGamesCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("games="));

  const allGames = allGamesCookie
    ? JSON.parse(allGamesCookie.split("=")[1])
    : [];

  // Filter the games based on the gameId
  const game = allGames.filter(
    (game) => parseInt(params.gameId) === parseInt(game.gameIndex)
  );

  // Select the corresponding game data with the id/index
  const gameData = game[0];
  console.log("outer:", gameData.imageTop);
*/

  const [home, setHome] = useState(true);

  return (
    <>
      <div>
        <button onClick={() => setHome((prev) => !prev)}>
          {home ? "Switch to away team" : "Switch to home team"}
        </button>
        {home && <TeamActionDetails gameData={gameData} home={home} />}
        {!home && <TeamActionDetails gameData={gameData} home={home} />}
      </div>
      <button onClick={navigateHandler}>Go back</button>
    </>
  );
};

export default GameDetailPage;
