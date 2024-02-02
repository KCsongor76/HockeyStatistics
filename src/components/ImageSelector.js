import React, { useState, useEffect } from "react";

const ImageSelector = ({ clickCoordinates, imageUrl }) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(100);
  const [endY, setEndY] = useState(100);
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);

  const handleSliderChange = (axis, value) => {
    // Handle changes in slider values
    if (axis === "x") {
      setStartX(value[0]);
      setEndX(value[1]);
    } else {
      setStartY(value[0]);
      setEndY(value[1]);
    }
  };

  useEffect(() => {
    // Filter coordinates based on the selected rectangular area
    const filteredCoordinates = clickCoordinates.filter(
      ({ x, y }) => x >= startX && x <= endX && y >= startY && y <= endY
    );
    setSelectedCoordinates(filteredCoordinates);
  }, [clickCoordinates, startX, endX, startY, endY]);

  return (
    <div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src={imageUrl}
          alt="pic"
          style={{ width: "800px", height: "500px" }}
        />
        <div
          style={{
            position: "absolute",
            border: "1px solid red",
            left: `${startX}px`,
            top: `${startY}px`,
            width: `${endX - startX}px`,
            height: `${endY - startY}px`,
            pointerEvents: "none",
          }}
        />
      </div>

      <div>
        <label>Horizontal Slider</label>
        <input
          type="range"
          min="0"
          max="100"
          value={[startX, endX]}
          onChange={(e) => handleSliderChange("x", e.target.value.split(","))}
        />
      </div>

      <div>
        <label>Vertical Slider</label>
        <input
          type="range"
          min="0"
          max="100"
          value={[startY, endY]}
          onChange={(e) => handleSliderChange("y", e.target.value.split(","))}
        />
      </div>

      <div>
        <h2>Selected Coordinates</h2>
        <ul>
          {selectedCoordinates.map(({ x, y }, index) => (
            <li key={index}>{`(${x}, ${y})`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImageSelector;
