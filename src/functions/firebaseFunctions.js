import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const teamsCollectionRef = collection(db, "teams");
export const championshipsCollection = collection(db, "championships");

export const deleteTeam = async (id, allTeams, setAllTeams) => {
  try {
    const teamDoc = doc(db, "teams", id);
    await deleteDoc(teamDoc);
    setAllTeams(allTeams.filter((team) => team.id !== id));
    console.log("Team deleted successfully");
  } catch (error) {
    console.error("Error deleting team:", error);
  }
};

export const getAllTeams = async (setAllTeams) => {
  try {
    const data = await getDocs(teamsCollectionRef);
    setAllTeams(data.docs);
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
};

export const getAllTeams2 = async (setAllTeams) => {
  try {
    const data = await getDocs(teamsCollectionRef);
    const teams = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAllTeams(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
};

export const fetchTeamsData = async (setTeams, setTeamsLoaded) => {
  const teamsCollection = collection(db, "teams");
  try {
    const data = await getDocs(teamsCollection);
    const allTeamsData = [];
    const romTeamsData = [];
    const euhlTeamsData = [];

    data.forEach((doc) => {
      const team = doc.data();
      team.championships.forEach((championship) => {
        if (championship === "euhl") {
          euhlTeamsData.push(team);
        } else if (championship === "romanian") {
          romTeamsData.push(team);
        }
      });

      allTeamsData.push(team);
    });

    setTeams({
      allTeams: allTeamsData,
      euhlTeams: euhlTeamsData,
      romTeams: romTeamsData,
    });
    setTeamsLoaded(true);
  } catch (error) {
    console.error("Error fetching teams: ", error);
  }
};

export const getTeamsData = async (setTeams) => {
  const data = await getDocs(teamsCollectionRef);
  setTeams(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
};

export const getTeamById = async (teamId, setTeam) => {
  const team = await getDoc(doc(db, "teams", teamId));
  setTeam(team.data());
};

export const getChampionships = async (setChampionships) => {
  try {
    const data = await getDocs(championshipsCollection);
    const championships = data.docs.map((doc) => doc.data().name);
    console.log("championship:", championships);
    setChampionships(championships);
  } catch (error) {
    console.error("Error getting championships: ", error);
  }
};

export const uploadLogo = async (logo) => {
  try {
    const storageRef = ref(storage);
    const fileRef = ref(storageRef, logo.name);
    await uploadBytes(fileRef, logo);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error("Error uploading logo: ", error);
  }
};

export const createTeam = async (teamData, logoUrl) => {
  await addDoc(teamsCollectionRef, {
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
    championships: teamData.championships,
  });
};

export const createPlayer = async (playerData, selectedTeam) => {
  const teamRef = doc(db, "teams", selectedTeam);
  const team = await getDoc(teamRef);
  const teamData = team.data();
  if (teamData.players) {
    await updateDoc(teamRef, {
      players: [...teamData.players, playerData],
    });
  } else {
    await updateDoc(teamRef, {
      players: [playerData],
    });
  }
};

export const deletePlayer = (player, teamId, team, setTeam) => {
  const teamRef = doc(db, "teams", teamId);
  const remainingPlayers = team.players.filter((p) => p !== player);
  try {
    updateDoc(teamRef, { players: remainingPlayers });
    getTeamById(teamId, setTeam);
    alert("Player deleted successfully");
  } catch {
    alert("Error deleting player");
  }
};

export const transferPlayer = async (
  fromTeam,
  toTeam,
  player,
  setFromTeam,
  setPlayer,
  setAllTeams
) => {
  const fromTeamRef = doc(db, "teams", fromTeam.id);
  const toTeamRef = doc(db, "teams", toTeam.id);

  try {
    // Remove player from the fromTeam
    const updatedFromTeamPlayers = fromTeam.players.filter(
      (p) => p.name !== player.name
    );
    await updateDoc(fromTeamRef, {
      players: updatedFromTeamPlayers,
    });

    // Update the fromTeam state
    setFromTeam({ ...fromTeam, players: updatedFromTeamPlayers });

    // Add player to the toTeam
    const updatedToTeamPlayers = toTeam.players
      ? [...toTeam.players, player]
      : [player];
    await updateDoc(toTeamRef, {
      players: updatedToTeamPlayers,
    });

    // Refresh the teams data
    await getAllTeams2(setAllTeams);

    // Clear the player state
    setPlayer(null);

    alert("Player transferred successfully");
  } catch (error) {
    console.error("Error transferring player:", error);
  }
};
