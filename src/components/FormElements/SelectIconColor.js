import Icon from "../Icon";

import classes from "./SelectIconColor.module.css";

const SelectIconColor = ({ home, homeColors, awayColors, onChange}) => {
  const labeltext = home
    ? "Select home team icon colors"
    : "Select away team icon colors";

  const colorChangeHandler = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label>{labeltext}</label>
      <input
        type="color"
        value={homeColors.background}
        onChange={colorChangeHandler}
      />

      <input
        type="color"
        value={homeColors.color}
        onChange={colorChangeHandler}
      />

      <div className={classes.icons}>
        <Icon
          type="shot"
          inmodal={true}
          background={home ? homeColors.background : awayColors.background}
          textColor={home ? homeColors.color : awayColors.color}
        />

        <Icon
          type="turnover"
          inmodal={true}
          background={home ? homeColors.background : awayColors.background}
          textColor={home ? homeColors.color : awayColors.color}
        />
      </div>
    </div>
  );
};

export default SelectIconColor;
