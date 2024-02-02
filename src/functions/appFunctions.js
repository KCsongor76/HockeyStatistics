export const gameDataHandler = (prevGames, setPrevGames, coordData) => {
  let gameIndex = prevGames.length + 1;
  const newPrevGames = [...prevGames, { ...coordData, gameIndex }];
  setPrevGames(newPrevGames);
  localStorage.setItem("games", JSON.stringify(newPrevGames));
};

export const gameDataHandler2 = (prevGames, setPrevGames, coordData) => {
  let gameIndex = prevGames.length + 1;

  const newPrevGames = [...prevGames, { ...coordData, gameIndex }];
  setPrevGames(newPrevGames);

  // Convert the data to a string
  const cookieValue = JSON.stringify(newPrevGames);

  // Set the cookie with an expiration date (e.g., 30 day)
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  document.cookie = `games=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
};
