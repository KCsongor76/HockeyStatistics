const SelectPlayersList = ({
  selectedPlayers,
  playingPlayers,
  playerHandler,
  nonPlayingPlayers,
  home,
  setPlayingHomePlayers,
  setNonPlayingHomePlayers,
  setPlayingAwayPlayers,
  setNonPlayingAwayPlayers,
}) => {
  return (
    <div>
      {selectedPlayers.length === 0 && <p>No players found</p>}
      {selectedPlayers.map((player) => (
        <div key={player.jerseyNr + player.name + player.position}>
          <p>
            #{player.jerseyNr}: {player.name}
          </p>
          <button
            value={player.jerseyNr + player.position}
            onClick={(event) =>
              playerHandler(
                event,
                playingPlayers,
                nonPlayingPlayers,
                home,
                setPlayingHomePlayers,
                setNonPlayingHomePlayers,
                setPlayingAwayPlayers,
                setNonPlayingAwayPlayers
              )
            }
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectPlayersList;
