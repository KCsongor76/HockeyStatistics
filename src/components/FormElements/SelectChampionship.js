const SelectChampionship = ({ championship, onChange }) => {
  const championshipChangeHandler = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label>Select Championship: </label>
      <select value={championship} onChange={championshipChangeHandler}>
        <option value="romanian">Romanian Championship</option>
        <option value="euhl">EUHL</option>
      </select>
    </div>
  );
};

export default SelectChampionship;
