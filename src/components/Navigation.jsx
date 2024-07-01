import React from "react";
import Logo from "../img/home-logo.svg";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="container mx-auto flex items-center justify-between mt-5">
      <Link to="/" className="shrink-0">
        <button className="logo">
          <img src={Logo} alt="" />
        </button>
      </Link>
      <ul className="flex gap-10 text-white text-3xl font-medium">
        {/*Nav Options*/}
        <li className="p-2">
          <h3>ABOUT</h3>
        </li>
        <li className="p-2">
          <h3>FEEDBACK</h3>
        </li>
      </ul>
    </nav>
  );
}
