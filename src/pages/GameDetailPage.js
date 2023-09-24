import { useNavigate, useParams } from "react-router-dom";

const GameDetailPage = () => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/games");
  };

  const params = useParams();
  const allGames = JSON.parse(localStorage.getItem("games"));
  const game = allGames.filter(
    (game) => parseInt(params.gameId) === parseInt(game.gameIndex)
  );
  const gameData = game[0];
  console.log(gameData);

  return (
    <>
      <div>
        <img src={gameData.selectedImage}></img>
      </div>
    </>
  );
};

export default GameDetailPage;
