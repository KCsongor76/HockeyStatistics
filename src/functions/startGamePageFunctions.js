import rink_up from "../images/rink/icerink_up.jpg";
import rink_down from "../images/rink/icerink_down.jpg";

/**
 *
 * @param {*} gameData = {championship, gameType, selectedImage, selectedHomeTeam, selectedAwayTeam, homeColors, awayColors}
 * @param {*} image
 * @param {function} setGameData
 * @param {function} setIsSubmitted
 * @param {function} setModalIsOpen
 * Gets all the gameData from the form, and redirects you to the rink image, to start the game.
 * If you choose the same teams, it won't let you to continue, and shows a modal with corresponding message.
 */
export const formSubmitHandler = (
  gameData,
  image,
  setGameData,
  setIsSubmitted,
  setModalIsOpen
) => {
  // TODO: "option1" -> constants
  image = gameData.selectedImage === "option1" ? rink_down : rink_up;

  if (gameData.selectedHomeTeam !== gameData.selectedAwayTeam) {
    // TODO:
    setGameData(() => {
      return {
        ...gameData,
        selectedImage: image,
      };
    });
    //gameData = { ...gameData, selectedImage: image };
    console.log(image);
    setIsSubmitted(true);
  } else {
    setModalIsOpen(true);
  }
};
