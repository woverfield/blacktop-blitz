import React from "react";
import { Link } from "react-router-dom";
import BlacktopText from "../img/BLACKTOP.svg";
import BlitzText from "../img/BLITZ.svg";

export default function MainMenu({}) {
  return (
    <main className="flex h-full flex-col justify-center">
      {/*Title*/}
      <div className="container mx-auto flex flex-col items-center gap-5 max-w-2xl p-3">
        <img src={BlacktopText} alt="" className="w-full" />
        <img src={BlitzText} alt="" className="w-7/12" />
      </div>
      {/*Buttons*/}
      <div className="flex justify-center text-black gap-20 my-20 font-medium flex-wrap">
        <Link to="/qplay">
          <button className="menu-btn bg-white p-5 px-10 text-xl">
            <h3>QUICK PLAY</h3>
          </button>
        </Link>
      </div>
    </main>
  );
}
