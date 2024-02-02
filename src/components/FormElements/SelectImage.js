import rink_down from "../../images/rink/icerink_down.jpg";
import rink_up from "../../images/rink/icerink_up.jpg";

/**
 * This component is responsible for
 * rendering and handling the selection
 * of an ice rink image.
 * @param {*} param0
 * @returns
 */
const SelectImage = ({ selectedImage, optionString, onChange }) => {
  const imageChangeHandler = (event) => {
    onChange(event.target.value === "option1" ? rink_down : rink_up);
  };

  const image = optionString === "option1" ? rink_down : rink_up;

  return (
    <div>
      <label>
        <input
          type="radio"
          name="imageOption"
          value={optionString}
          checked={selectedImage === image}
          onChange={imageChangeHandler}
        />
        <img src={image} alt="RinkImage" />
      </label>
    </div>
  );
};

export default SelectImage;
