import Icon from "./Icon";
import classes from "../modals/IconModal.module.css";

const IconRow = ({ home, colors, iconClickHandler }) => {
  return (
    <div className={classes.icons}>
      <Icon
        home={home}
        type="shot"
        inmodal={true}
        background={colors.background}
        textColor={colors.color}
        onClick={iconClickHandler}
      />
      <Icon
        home={home}
        type="turnover"
        inmodal={true}
        background={colors.background}
        textColor={colors.color}
        onClick={iconClickHandler}
      />
      <Icon
        home={home}
        type="goal"
        inmodal={true}
        background={colors.background}
        textColor={colors.color}
        onClick={iconClickHandler}
      />
    </div>
  );
};

export default IconRow;
