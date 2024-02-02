/**
 * This component is responsible for rendering an array of player objects,
 * with buttons attached to each player, which adds/removes them from
 * the roster.
 * @param {*} param0
 * @returns
 */
const SelectPlayersList = ({ players, setters, playerHandler, home }) => {
  return (
    <div>
      {players.selectedPlayers.length === 0 && <p>No players found</p>}
      {players.selectedPlayers.map((player) => (
        <div key={player.jerseyNr + player.name + player.position}>
          <p>
            #{player.jerseyNr}: {player.name}
          </p>
          <button
            value={player.jerseyNr + player.position}
            onClick={(event) =>
              playerHandler(
                event,
                players.playingPlayers,
                players.nonPlayingPlayers,
                home,
                setters.setPlayingHomePlayers,
                setters.setNonPlayingHomePlayers,
                setters.setPlayingAwayPlayers,
                setters.setNonPlayingAwayPlayers
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
