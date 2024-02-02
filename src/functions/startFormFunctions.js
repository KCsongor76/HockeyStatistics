import logo_sapi from "../images/logo/sapi.png";
import logo_sportklub from "../images/logo/sccs.png";

/*  
  general structures 
    for players:
      {
        name: string
        jerseyNr: int
        position: string (char(1))
      }

    for teamcolors/iconcolors:
      {
        background: "#..."
        color: "#..." (text-color)
      }
    
    for teams:
      {
        name: string
        players: array[player objects]
        logo: image path
        iconColors: iconcolors object 
      }
*/

const players_Sapi = [
  { name: "Kristó Csongor", jerseyNr: 76, position: "D" },
  { name: "Márton Botond", jerseyNr: 97, position: "F" },
  { name: "Bíró Nándor", jerseyNr: 30, position: "G" },
];

const players_Sportklub = [
  { name: "Salló Alpár", jerseyNr: 55, position: "D" },
  { name: "Becze Tihamér", jerseyNr: 20, position: "F" },
  { name: "Ambrus Levente", jerseyNr: 72, position: "G" },
];
const playersA = [];
const playersB = [];

export const defaultIconColors = { background: "#000000", color: "#FFFFFF" };

const team1 = {
  name: "Sapientia U23",
  players: players_Sapi,
  playingPlayers: players_Sapi,
  logo: logo_sapi,
  iconColors: { defaultIconColors },
};
const team2 = {
  name: "Sportklub Csíkszereda",
  players: players_Sportklub,
  playingPlayers: players_Sportklub,
  logo: logo_sportklub,
  iconColors: { defaultIconColors },
};
const teamA = {
  name: "Team A",
  players: playersA,
  playingPlayers: playersA,
  iconColors: { defaultIconColors },
};
const teamB = {
  name: "Team B",
  players: playersB,
  playingPlayers: playersB,
  iconColors: { defaultIconColors },
};

export const teamsROM = [team1, team2];
export const teamsEUHL = [teamA, teamB];
export const championships = ["romanian", "euhl"];

export const selectTeamHandler = (
  event,
  home,
  allTeams,
  setSelectedHomeTeam,
  setSelectedAwayTeam
) => {
  // handles the team select part of the form
  for (let team of allTeams) {
    if (team.name === event.target.value) {
      if (home) {
        setSelectedHomeTeam(team);
      } else {
        setSelectedAwayTeam(team);
      }
    }
  }
};

/**
 *
 * @param {*} event
 * @param {*} data
 * @param {*} onFormSubmit
 * Sends data up to the parent component (StartGamePage), where this data is passed down to the game page.
 */
export const submitHandler = (event, data, onFormSubmit) => {
  event.preventDefault();
  onFormSubmit(data);
};
