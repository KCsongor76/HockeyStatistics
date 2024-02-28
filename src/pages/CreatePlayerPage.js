import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "@firebase/firestore";

const CreatePlayerPage = () => {
  const [playerData, setPlayerData] = useState({
    name: "",
    jerseyNr: 0,
    position: "",
  });

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  const teamsCollection = collection(db, "teams");

  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      playerData.name == "" ||
      playerData.jerseyNr < 1 ||
      playerData.jerseyNr > 99 ||
      playerData.position == ""
    ) {
      alert("Fill in correct values in all fields");
      return;
    }
    try {
      const teamRef = doc(db, "teams", selectedTeam);

      const teamSnapshot = await getDoc(teamRef);
      if (teamSnapshot.exists()) {
        const teamData = teamSnapshot.data();
        if (teamData.players) {
          await updateDoc(teamRef, {
            players: [...teamData.players, playerData],
          });
        } else {
          await updateDoc(teamRef, {
            players: [playerData],
          });
        }
        alert("Player added successfully!");
        setPlayerData({
          name: "",
          jerseyNr: 0,
          position: "",
        });
        setSelectedTeam("");
      } else {
        console.error("Team document does not exist.");
        alert("Error adding player. Please try again.");
      }
    } catch (error) {
      console.error("Error adding player: ", error);
      alert("Error adding player. Please try again.");
    }
  };

  useEffect(() => {
    const getTeamsData = async () => {
      const data = await getDocs(teamsCollection);
      setTeams(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    getTeamsData();
  }, []);

  console.log(teams);

  return (
    <>
      <h2>Create player</h2>
      <form onSubmit={submitHandler}>
        <label>
          Name:
          <input
            type="text"
            value={playerData.name}
            onChange={(event) =>
              setPlayerData((prevData) => {
                return { ...prevData, name: event.target.value };
              })
            }
          />
        </label>
        <label>
          Jersey Number:
          <input
            type="number"
            value={playerData.jerseyNr}
            onChange={(event) =>
              setPlayerData((prevData) => {
                return { ...prevData, jerseyNr: event.target.value };
              })
            }
          />
        </label>
        <label>
          Position:
          <select
            value={playerData.position}
            onChange={(event) =>
              setPlayerData((prevData) => {
                return { ...prevData, position: event.target.value };
              })
            }
          >
            <option value="">Select Position</option>
            <option value="F">Forward</option>
            <option value="D">Defender</option>
            <option value="G">Goalie</option>
          </select>
        </label>

        <label>
          Team:
          <select
            value={selectedTeam}
            onChange={(event) => setSelectedTeam(event.target.value)}
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create Player</button>
      </form>
    </>
  );
};

export default CreatePlayerPage;
