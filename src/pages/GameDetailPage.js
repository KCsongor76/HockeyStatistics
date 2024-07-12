import { useNavigate, useParams } from "react-router-dom";

import TeamActionDetails from "../components/TeamActionDetails";
import { useEffect, useState } from "react";

import { db } from "../firebase-config";
import { collection, getDocs } from "@firebase/firestore";

const GameDetailPage = () => {
  const [prevGamesData, setPrevGamesData] = useState([]);
  const [home, setHome] = useState(true);
  const [isFetched, setIsFetched] = useState(false);

  const fetchPrevGamesData = async () => {
    try {
      const gamesCollection = collection(db, "games");
      const data = await getDocs(gamesCollection);
      const allGamesData = [];

      data.forEach((doc) => {
        const game = doc.data();
        allGamesData.push(game);
      });

      setPrevGamesData(allGamesData);
      setIsFetched(true);
    } catch (error) {
      console.error("Error fetching previous games: ", error);
    }
  };
  useEffect(() => {
    fetchPrevGamesData();
  }, []);

  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/games");
    // going back
  };

  const params = useParams();
  const condition = prevGamesData.length >= 0;
  const game = condition
    ? prevGamesData.filter(
        (game) => parseInt(params.gameId) === parseInt(game.gameIndex)
      )
    : [{}]; // selecting the corresponding game data with the id/index

  // game = [{...}] - array with only one element
  const gameData = game[0];

  return (
    <>
      {isFetched && (
        <div>
          <div>
            <button onClick={() => setHome((prev) => !prev)}>
              {home ? "Switch to away team" : "Switch to home team"}
            </button>
            {home && <TeamActionDetails gameData={gameData} home={home} />}
            {!home && <TeamActionDetails gameData={gameData} home={home} />}
          </div>
          <button onClick={navigateHandler}>Go back</button>
        </div>
      )}
    </>
  );
};

export default GameDetailPage;
