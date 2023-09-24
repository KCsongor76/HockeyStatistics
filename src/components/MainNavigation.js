import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <nav className={classes.container}>
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => ({ color: isActive ? "green" : "white" })}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="start"
            style={({ isActive }) => ({ color: isActive ? "green" : "white" })}
          >
            Start Game
          </NavLink>
        </li>
        <li>
          <NavLink
            to="games"
            style={({ isActive }) => ({ color: isActive ? "green" : "white" })}
          >
            Previous Games
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
