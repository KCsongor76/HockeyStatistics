import { useEffect, useState } from "react";
import { db, storage } from "../firebase-config";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import classes from "./CreateTeamPage.module.css";

const CreateTeamPage = () => {
  const teamsCollection = collection(db, "teams");
  const championshipsCollection = collection(db, "championships");

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
      teamData.name == "" ||
      teamData.logo == null
    ) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const logoUrl = await uploadLogo(teamData.logo);
      await addDoc(teamsCollection, {
        name: teamData.name,
        logo: logoUrl,
        colors: {
          home: {
            primary: teamData.colors.home.primary,
            secondary: teamData.colors.home.secondary,
          },
          away: {
            primary: teamData.colors.away.primary,
            secondary: teamData.colors.away.secondary,
          },
        },
        championships: teamData.championships, // Add championships to the submitted data
      });
      console.log("Team added successfully!");
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

      document.getElementById("logoInput").value = ""; // TODO: add value to the input?
    } catch (error) {
      console.error("Error adding team: ", error);
    }
  };

  const uploadLogo = async (logo) => {
    try {
      const storageRef = ref(storage);
      const fileRef = ref(storageRef, logo.name);
      await uploadBytes(fileRef, logo);
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.error("Error uploading logo: ", error);
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
    const getChampionships = async () => {
      try {
        const data = await getDocs(championshipsCollection);
        const championships = data.docs.map((doc) => doc.data().name);
        console.log("championship:", championships);
        setChampionships(championships);
      } catch (error) {
        console.error("Error getting championships: ", error);
      }
    };

    getChampionships();
  }, []);

  return (
    <>
      <h2>Create team</h2>

      <form onSubmit={submitHandler}>
        <label>
          Team name:
          <input
            type="text"
            name="name"
            value={teamData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Team logo:
          <input type="file" id="logoInput" onChange={handleFileChange} />
        </label>
        <label>
          Home colors:
          <br />
          Primary:{" "}
          <input
            type="color"
            value={teamData.colors.home.primary}
            onChange={(event) => handleColorChange(event, "home", "primary")}
          />
          <br />
          Secondary:{" "}
          <input
            type="color"
            value={teamData.colors.home.secondary}
            onChange={(event) => handleColorChange(event, "home", "secondary")}
          />
        </label>
        <label>
          Away colors:
          <br />
          Primary:{" "}
          <input
            type="color"
            value={teamData.colors.away.primary}
            onChange={(event) => handleColorChange(event, "away", "primary")}
          />
          <br />
          Secondary:{" "}
          <input
            type="color"
            value={teamData.colors.away.secondary}
            onChange={(event) => handleColorChange(event, "away", "secondary")}
          />
        </label>
        <label>
          Championships
          {championships.map((championship, index) => (
            <div key={index}>
              <input
                type="checkbox"
                value={championship}
                onChange={handleCheckboxChange}
                checked={teamData.championships.includes(championship)}
              />
              {championship}
            </div>
          ))}
        </label>

        <button type="submit">Create team</button>
      </form>
    </>
  );
};

export default CreateTeamPage;
