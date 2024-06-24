import React from "react";
import { Link } from "react-router-dom";
import BlacktopText from "../img/BLACKTOP.svg";
import BlitzText from "../img/BLITZ.svg";

export default function MainMenu({}) {
  return (
    <main className="flex h-full flex-col justify-center">
      {/*Title*/}
      <div className="container mx-auto flex flex-col items-center gap-5">
        <img src={BlacktopText} alt="" className="max-w-xl" />
        <img src={BlitzText} alt="" className="max-w-lg" />
      </div>
      {/*Buttons*/}
      <div className="flex justify-center text-black gap-20 my-20 font-medium">
        <Link to="/qplay">
          <button className="bg-white rounded-md p-5 px-10 text-xl">
            <h3>QUICK PLAY</h3>
          </button>
        </Link>
        <button className="bg-white rounded-md p-5 px-10 text-xl">
          <h3>TOURNAMENT</h3>
        </button>
      </div>
    </main>
  );
}
