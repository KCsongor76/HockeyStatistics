import { useEffect, useState } from "react";

import classes from "./CreateTeamPage.module.css";
import { useNavigate } from "react-router-dom";
import {
  createTeam,
  getChampionships,
  uploadLogo,
} from "../../functions/firebaseFunctions";

const CreateTeamPage = () => {
  const navigate = useNavigate();

  const [teamData, setTeamData] = useState({
    name: "",
    logo: null,
    colors: {
      home: { primary: "#000000", secondary: "#FFFFFF" }, // Set initial colors
      away: { primary: "#000000", secondary: "#FFFFFF" }, // Set initial colors
    },
    championships: [],
  });

  const [championships, setChampionships] = useState([]);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      teamData.championships.length === 0 ||
      teamData.name === "" ||
      teamData.logo == null
    ) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const logoUrl = await uploadLogo(teamData.logo);
      createTeam(teamData, logoUrl);

      // Reset form after successful submission
      setTeamData({
        name: "",
        logo: null,
        colors: {
          home: { primary: "#000000", secondary: "#FFFFFF" },
          away: { primary: "#000000", secondary: "#FFFFFF" },
        },
        championships: [], // Reset championships selection
      });

      document.getElementById("logoInput").value = "";
      alert("Team added successfully!");
    } catch (error) {
      console.error("Error adding team: ", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setTeamData({
      ...teamData,
      logo: file,
    });
  };

  const handleColorChange = (event, location, colorType) => {
    const value = event.target.value;
    setTeamData({
      ...teamData,
      colors: {
        ...teamData.colors,
        [location]: {
          ...teamData.colors[location],
          [colorType]: value,
        },
      },
    });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setTeamData((prevData) => ({
        ...prevData,
        championships: [...prevData.championships, value], // Add the selected championship
      }));
    } else {
      setTeamData((prevData) => ({
        ...prevData,
        championships: prevData.championships.filter(
          (champ) => champ !== value
        ), // Remove the unselected championship
      }));
    }
  };

  useEffect(() => {
    getChampionships(setChampionships);
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>Create team</h2>

      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.field}>
          <label className={classes.label}>Team name:</label>
          <input
            type="text"
            name="name"
            value={teamData.name}
            onChange={handleChange}
            className={classes.inputText}
          />
        </div>

        <div className={classes.field}>
          <label className={classes.label}>Team logo:</label>
          <input
            type="file"
            id="logoInput"
            onChange={handleFileChange}
            className={classes.inputFile}
          />
        </div>

        <div className={classes.field}>
          <label className={classes.label}>Home colors:</label>
          <div className={classes.colorsContainer}>
            <div>
              <label className={classes.label}>Primary:</label>
              <input
                type="color"
                value={teamData.colors.home.primary}
                onChange={(event) =>
                  handleColorChange(event, "home", "primary")
                }
                className={classes.inputColor}
              />
            </div>
            <div>
              <label className={classes.label}>Secondary:</label>
              <input
                type="color"
                value={teamData.colors.home.secondary}
                onChange={(event) =>
                  handleColorChange(event, "home", "secondary")
                }
                className={classes.inputColor}
              />
            </div>
          </div>
        </div>

        <div className={classes.field}>
          <label className={classes.label}>Away colors:</label>
          <div className={classes.colorsContainer}>
            <div>
              <label className={classes.label}>Primary:</label>
              <input
                type="color"
                value={teamData.colors.away.primary}
                onChange={(event) =>
                  handleColorChange(event, "away", "primary")
                }
                className={classes.inputColor}
              />
            </div>
            <div>
              <label className={classes.label}>Secondary:</label>
              <input
                type="color"
                value={teamData.colors.away.secondary}
                onChange={(event) =>
                  handleColorChange(event, "away", "secondary")
                }
                className={classes.inputColor}
              />
            </div>
          </div>
        </div>

        <div className={classes.field}>
          <label className={classes.label}>Championships:</label>
          <div>
            {championships.map((championship, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  value={championship}
                  onChange={handleCheckboxChange}
                  checked={teamData.championships.includes(championship)}
                  className={classes.checkbox}
                />
                {championship}
              </div>
            ))}
          </div>
        </div>

        <div className={classes.buttonContainer}>
          <button
            type="submit"
            className={`${classes.button} ${classes.submitButton}`}
          >
            Create team
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`${classes.button} ${classes.goBackButton}`}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeamPage;
