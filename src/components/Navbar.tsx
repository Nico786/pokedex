import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Pokedex
      </NavLink>
      <NavLink
        to="/team"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Team
      </NavLink>
      <NavLink
        to="/fight"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Fight
      </NavLink>
    </nav>
  );
};

export default Navbar;
