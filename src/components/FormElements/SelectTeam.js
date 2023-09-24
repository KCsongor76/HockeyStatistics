const SelectTeam = ({
  home,
  selectedHomeTeam,
  selectedAwayTeam,
  allTeams,
  onChange,
}) => {
  const labeltext = home ? "Select Home Team" : "Select Away Team";
  const val = home ? selectedHomeTeam.name : selectedAwayTeam.name;
  const selectTeamHandler = (event, home) => {
    onChange(event, home);
  };

  return (
    <div>
      <label>{labeltext}</label>
      <select value={val} onChange={selectTeamHandler}>
        {allTeams.map((team) => (
          <option value={team.name} key={team.name}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectTeam;
