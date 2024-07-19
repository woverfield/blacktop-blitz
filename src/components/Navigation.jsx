import React, { useState, useEffect } from "react";
import Logo from "../img/home-logo.svg";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

export default function Navigation() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="container mx-auto flex items-center justify-between mt-5 font-serif">
      <Link to="/blacktop-blitz" className="shrink-0">
        <button className="logo">
          <img src={Logo} alt="Logo" />
        </button>
      </Link>
      {isMobile ? (
        <MobileMenu />
      ) : (
        <ul className="flex gap-10 text-white text-3xl font-medium">
          <Link to="/blacktop-blitz/about">
            <button>
              <li className="p-2">
                <h3>ABOUT</h3>
              </li>
            </button>
          </Link>
          <Link to="/blacktop-blitz/feedback">
            <button>
              <li className="p-2">
                <h3>FEEDBACK</h3>
              </li>
            </button>
          </Link>
        </ul>
      )}
    </nav>
  );
}
