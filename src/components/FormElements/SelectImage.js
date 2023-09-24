import rink_down from "../../images/rink/icerink_down.jpg";
import rink_up from "../../images/rink/icerink_up.jpg";

const SelectImage = ({ selectedImage, optionString, onChange }) => {
  const imageChangeHandler = (event) => {
    onChange(event.target.value);
  };

  const image = optionString === "option1" ? rink_down : rink_up;

  return (
    <div>
      <label>
        <input
          type="radio"
          name="imageOption"
          value={optionString}
          checked={selectedImage === optionString}
          onChange={imageChangeHandler}
        />
        <img src={image} alt="RinkImage" />
      </label>
    </div>
  );
};

export default SelectImage;
