import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Recherche
      </NavLink>
      <NavLink
        to="/pokedex"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Pokedex
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Team
      </NavLink>
    </nav>
  );
};

export default Navbar;
