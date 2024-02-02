export const doneHandler = (
  setSelectedHomeTeam,
  playingHomePlayers,
  setSelectedAwayTeam,
  playingAwayPlayers,
  onRequestClose
) => {
  setSelectedHomeTeam((prevData) => ({
    ...prevData,
    playingPlayers: playingHomePlayers,
  }));

  setSelectedAwayTeam((prevData) => ({
    ...prevData,
    playingPlayers: playingAwayPlayers,
  }));

  onRequestClose();
};

export const resetHandler = (
  setPlayingHomePlayers,
  allHomePlayers,
  setPlayingAwayPlayers,
  allAwayPlayers,
  setNonPlayingAwayPlayers,
  setNonPlayingHomePlayers,
  setSelectedHomeTeam,
  setSelectedAwayTeam
) => {
  setPlayingHomePlayers(allHomePlayers);
  setPlayingAwayPlayers(allAwayPlayers);

  setNonPlayingAwayPlayers([]);
  setNonPlayingHomePlayers([]);

  setSelectedHomeTeam((prevData) => ({
    ...prevData,
    playingPlayers: allHomePlayers,
  }));

  setSelectedAwayTeam((prevData) => ({
    ...prevData,
    playingPlayers: allAwayPlayers,
  }));
};

export const removePlayerHandler = (
  event,
  playingPlayers,
  nonPlayingPlayers,
  home,
  setPlayingHomePlayers,
  setNonPlayingHomePlayers,
  setPlayingAwayPlayers,
  setNonPlayingAwayPlayers
) => {
  event.preventDefault();
  const selectedElement = playingPlayers.find(
    (prevPlayer) =>
      prevPlayer.jerseyNr + prevPlayer.position === event.target.value
  );

  if (selectedElement) {
    // Remove the element from playingHomePlayers
    const newArray1 = playingPlayers.filter(
      (prevPlayer) => prevPlayer !== selectedElement
    );

    // Add the element to array2
    const newArray2 = [...nonPlayingPlayers, selectedElement];

    // Update the state
    if (home) {
      setPlayingHomePlayers(newArray1);
      setNonPlayingHomePlayers(newArray2);
    } else {
      setPlayingAwayPlayers(newArray1);
      setNonPlayingAwayPlayers(newArray2);
    }
  }
};

export const addPlayerHandler = (
  event,
  playingPlayers,
  nonPlayingPlayers,
  home,
  setPlayingHomePlayers,
  setNonPlayingHomePlayers,
  setPlayingAwayPlayers,
  setNonPlayingAwayPlayers
) => {
  event.preventDefault();
  const selectedElement = nonPlayingPlayers.find(
    (prevPlayer) =>
      prevPlayer.jerseyNr + prevPlayer.position === event.target.value
  );

  if (selectedElement) {
    // Remove the element from playingHomePlayers
    const newArray1 = nonPlayingPlayers.filter(
      (prevPlayer) => prevPlayer !== selectedElement
    );

    // Add the element to array2
    const newArray2 = [...playingPlayers, selectedElement];

    // Update the state
    if (home) {
      setPlayingHomePlayers(newArray2);
      setNonPlayingHomePlayers(newArray1);
    } else {
      setPlayingAwayPlayers(newArray2);
      setNonPlayingAwayPlayers(newArray1);
    }
  }
};
