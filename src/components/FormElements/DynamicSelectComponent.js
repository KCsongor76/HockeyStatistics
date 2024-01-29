const DynamicSelectComponent = ({
  type,
  onChange,
  championship,
  gameType,
  selectedHomeTeam,
  selectedAwayTeam,
  allTeams,
}) => {
  const championshipChangeHandler = (event) => {
    onChange(event.target.value);
  };

  const typeChangeHandler = (event) => {
    onChange(event.target.value);
  };

  const selectTeamHandler = (event, home) => {
    onChange(event, home);
  };

  const renderChampionshipSelect = () => (
    <div>
      <label>Select Championship: </label>
      <select value={championship} onChange={championshipChangeHandler}>
        <option value="romanian">Romanian Championship</option>
        <option value="euhl">EUHL</option>
      </select>
    </div>
  );

  const renderGameTypeSelect = () => (
    <div>
      <label>Select Type of Game:</label>
      <select value={gameType} onChange={typeChangeHandler}>
        <option value="regular">Regular Season</option>
        <option value="playoff">Playoff</option>
      </select>
    </div>
  );

  const renderSelectTeam = (home) => (
    <div>
      <label>{home ? "Select Home Team" : "Select Away Team"}</label>
      <select
        value={home ? selectedHomeTeam.name : selectedAwayTeam.name}
        onChange={(event) => selectTeamHandler(event, home)}
      >
        {allTeams.map((team) => (
          <option value={team.name} key={team.name}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      {type === "championship" && renderChampionshipSelect()}
      {type === "gametype" && renderGameTypeSelect()}
      {(type === "hometeam" || type === "awayteam") &&
        renderSelectTeam(type === "hometeam")}
    </div>
  );
};

export default DynamicSelectComponent;
