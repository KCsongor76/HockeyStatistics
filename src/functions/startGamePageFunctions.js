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
  setGameData,
  setIsSubmitted,
  setModalIsOpen
) => {
  console.log(gameData);
  if (gameData.selectedHomeTeam !== gameData.selectedAwayTeam) {
    setGameData(gameData);
    setIsSubmitted(true);
  } else {
    setModalIsOpen(true);
  }
};
