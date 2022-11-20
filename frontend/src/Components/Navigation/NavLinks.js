import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        {" "}
        <NavLink to="/dashboard">Authenticate</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/clients">Authenticate</NavLink>
      </li>

      <li>
        {" "}
        <NavLink to="/dossiers">Authenticate</NavLink>
      </li>

      <li>
        {" "}
        <NavLink to="/donnees">Authenticate</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/categories">Authenticate</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/reglages">Authenticate</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
