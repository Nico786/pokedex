import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="pokedex-nav">
      <div className="nav-indicator">
        <div className="indicator-light"></div>
        <div className="indicator-small red"></div>
        <div className="indicator-small yellow"></div>
        <div className="indicator-small green"></div>
      </div>
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span className="nav-icon">📖</span>
          Pokédex
        </NavLink>
        <NavLink
          to="/team"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span className="nav-icon">👥</span>
          Équipes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
