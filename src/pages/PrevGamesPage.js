import PrevGame from "../components/PrevGame";
import classes from "./PrevGamesPage.module.css";
import { useNavigate } from "react-router-dom";

const PrevGamesPage = () => {
  // getting the previous games' data (array) from localStorage
  const prevGamesData = JSON.parse(localStorage.getItem("games"));
  console.log(prevGamesData);
  const navigate = useNavigate();

  const navigateHandler = (index) => {
    console.log(index);
    navigate(`${index}`);
    // eg: /games/1 - dynamic page, selected game
  };

  return (
    <>
      <div className={classes.container}>
        {prevGamesData &&
          prevGamesData.map((prevGame) => (
            <PrevGame prevGame={prevGame} navigateHandler={navigateHandler} />
          ))}
        {!prevGamesData && <p>No games found.</p>}
      </div>
    </>
  );
};

export default PrevGamesPage;
