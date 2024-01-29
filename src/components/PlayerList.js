const PlayerList = ({ team, iconState, playerClickHandler }) => {
  return team.playingPlayers.map((player) => (
    <div
      key={player.jerseyNr + player.name + player.position}
      onClick={() => playerClickHandler({ player, iconState })}
    >
      <p>
        #{player.jerseyNr} {player.name}
      </p>
    </div>
  ));
};

export default PlayerList;
