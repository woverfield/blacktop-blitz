import React, { useState, useEffect } from "react";
import Logo from "../img/home-logo.svg";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

export default function Navigation() {
  const [isMobile, setIsMobile] = useState(false);

  // Function to handle window resize
  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // Effect to handle initial mount and resize events
  useEffect(() => {
    handleResize(); // Set initial state based on window width
    window.addEventListener("resize", handleResize); // Add event listener for resize
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

  return (
    <nav className="container mx-auto flex items-center justify-between mt-5">
      <Link to="/" className="shrink-0">
        <button className="logo">
          <img src={Logo} alt="Logo" />
        </button>
      </Link>
      {isMobile ? (
        <MobileMenu />
      ) : (
        <ul className="flex gap-10 text-white text-3xl font-medium">
          <li className="p-2">
            <h3>ABOUT</h3>
          </li>
          <li className="p-2">
            <h3>FEEDBACK</h3>
          </li>
        </ul>
      )}
    </nav>
  );
}

// Mobile menu component
const MobileMenu = () => {
  return (
    <div className="">
      <IoMenu className="text-white size-20"/>
    </div>
  );
};
