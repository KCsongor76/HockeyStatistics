import React, { useState, useEffect } from "react";

const PlayerDataForm = ({ onFilterChange }) => {
  const [selectedPeriods, setSelectedPeriods] = useState({
    period1: false,
    period2: false,
    period3: false,
  });

  const handleCheckboxChange = (period) => {
    setSelectedPeriods((prevSelectedPeriods) => ({
      ...prevSelectedPeriods,
      [period]: !prevSelectedPeriods[period],
    }));
  };

  useEffect(() => {
    onFilterChange(selectedPeriods);
  }, [selectedPeriods, onFilterChange]);

  return (
    <div>
      <label>
        Period 1
        <input
          type="checkbox"
          checked={selectedPeriods.period1}
          onChange={() => handleCheckboxChange("period1")}
        />
      </label>
      <label>
        Period 2
        <input
          type="checkbox"
          checked={selectedPeriods.period2}
          onChange={() => handleCheckboxChange("period2")}
        />
      </label>
      <label>
        Period 3
        <input
          type="checkbox"
          checked={selectedPeriods.period3}
          onChange={() => handleCheckboxChange("period3")}
        />
      </label>
    </div>
  );
};

export default PlayerDataForm;
