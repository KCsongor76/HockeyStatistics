import { useNavigate, useParams } from "react-router-dom";

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
  console.log(game);
  console.log(gameData);

  return (
    <>
      {/*
        TODO: showing data on the game picture:
          - all icons/events 
          - only selected events (only shots/...)
          - selected teams data
          - selected players data
          - time interval slider: what events happened between 25-30 minutes of the game?
          - etc...
      */}
      <div>
        <img src={gameData.selectedImage}></img>
      </div>
    </>
  );
};

export default GameDetailPage;
