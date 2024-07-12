import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

/**
 * This component is responsible for rendering the menu.
 * @returns
 */
const MainNavigation = ({ isSignedInAdmin }) => {
  const lineStyle = { color: "#007bff", fontWeight: "bold" };

  return isSignedInAdmin ? (
    <nav className={classes.container}>
      <ul className={classes.navList}>
        <li>
          <NavLink
            to="/"
            className={classes.navLink}
            style={({ isActive }) => (isActive ? lineStyle : null)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/start"
            className={classes.navLink}
            style={({ isActive }) => (isActive ? lineStyle : null)}
          >
            Start Game
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/games"
            className={classes.navLink}
            style={({ isActive }) => (isActive ? lineStyle : null)}
          >
            Previous Games
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/handleTeams"
            className={classes.navLink}
            style={({ isActive }) => (isActive ? lineStyle : null)}
          >
            Teams
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/handlePlayers"
            className={classes.navLink}
            style={({ isActive }) => (isActive ? lineStyle : null)}
          >
            Players
          </NavLink>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className={classes.container}>
      <ul className={classes.navList}>
        <li>
          <NavLink
            to="/"
            className={classes.navLink}
            style={({ isActive }) => (isActive ? lineStyle : null)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/start"
            className={classes.navLink}
            style={({ isActive }) => (isActive ? lineStyle : null)}
          >
            Start Game
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/games"
            className={classes.navLink}
            style={({ isActive }) => (isActive ? lineStyle : null)}
          >
            Previous Games
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/adminLogin"
            className={classes.navLink}
            style={({ isActive }) => (isActive ? lineStyle : null)}
          >
            Admin Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
