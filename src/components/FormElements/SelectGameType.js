const SelectGameType = ({ gameType, onChange }) => {
  const typeChangeHandler = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label>Select Type of Game:</label>
      <select value={gameType} onChange={typeChangeHandler}>
        <option value="regular">Regular Season</option>
        <option value="playoff">Playoff</option>
      </select>
    </div>
  );
};

export default SelectGameType;
