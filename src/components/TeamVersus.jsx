import React from "react";
import { Link } from "react-router-dom";
import PlayerCard from "./PlayerCard";

export default function TeamVersus({ teamOne, teamTwo }) {
  return (
    <main className="container mx-auto h-full flex flex-col justify-evenly text-white">
      <div className="row flex items-center justify-end">
        <div className="flex items-center gap-10 flex-wrap">
          {teamOne.map((player, idx) => {
            return <PlayerCard player={player} finalized={true} />;
          })}
        </div>
        <h1 className="text-5xl ml-5">TEAM ONE</h1>
      </div>
      <div className="border border-white w-full m-2"></div>
      <div className="row flex items-center">
        <h1 className="text-5xl mr-5">TEAM TWO</h1>
        <div className="row flex items-center gap-10 flex-wrap">
          {teamTwo.map((player, idx) => {
            return <PlayerCard player={player} finalized={true} />;
          })}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Link to="/">
          <button
            className="done-btn bg-white rounded-md p-5 px-10 text-xl my-5 text-black self-center"
            type="submit"
          >
            PLAY AGAIN?
          </button>
        </Link>
      </div>
    </main>
  );
}
