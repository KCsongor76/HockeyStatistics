import Icon from "../Icon";
import IconRow from "../IconRow";

import classes from "./SelectIconColor.module.css";

const SelectIconColor = ({ home, colors, onChange }) => {
  const labelText = home
    ? "Select home team icon colors"
    : "Select away team icon colors";

  const colorChangeHandler = (event) => {
    onChange({
      ...colors,
      color: event.target.value,
    });
  };

  const backgroundChangeHandler = (event) => {
    onChange({
      ...colors,
      background: event.target.value,
    });
  };

  return (
    <>
      <div>
        <label>{labelText}</label>
        <div className={classes.colorSelect}>
          <input
            type="color"
            value={colors.background}
            onChange={backgroundChangeHandler}
          />
          <input
            type="color"
            value={colors.color}
            onChange={colorChangeHandler}
          />
        </div>

        <div className={classes.icons}>
          <Icon
            type="shot"
            inmodal={true}
            background={colors.background}
            textColor={colors.color}
            onClick={() => {}}
          />

          <Icon
            type="turnover"
            inmodal={true}
            background={colors.background}
            textColor={colors.color}
            onClick={() => {}}
          />

          <Icon
            type="goal"
            inmodal={true}
            background={colors.background}
            textColor={colors.color}
            onClick={() => {}}
          />
        </div>
        {/*<IconRow home={true} colors={colors} iconClickHandler={() => {}} />*/}
        {/* TODO: solve styling of the component */}
      </div>
    </>
  );
};

export default SelectIconColor;
