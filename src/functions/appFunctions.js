export const gameDataHandler = (prevGames, setPrevGames, coordData) => {
  let gameIndex = prevGames.length + 1;
  const newPrevGames = [...prevGames, { ...coordData, gameIndex }];
  setPrevGames(newPrevGames);
  localStorage.setItem("games", JSON.stringify(newPrevGames));
};
