import React, { useState, useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import allPlayers from "../data/players.json";

export default function PlayerOptions({ players, formData }) {
  const gameSize = players;
  const query = formData;

  // round selection state
  const [p1Ready, setp1Ready] = useState(false);
  const [p2Ready, setp2Ready] = useState(false);

  const handleChange = (player) => {
    if (player === 1) {
      setp1Ready(true);
    } else if (player === 2) {
      setp2Ready(true);
    }
  };

  useEffect(() => {
    if (p1Ready === true && p2Ready === true) {
      document.querySelector(".next-btn").style.visibility = "visible";
    }
  }, [p1Ready, p2Ready]);

  const fitsQuery = (player) => {
    console.log(player.overall);
    console.log(query.get("min"));
    if (
      player.overall >= query.get("min") &&
      player.overall <= query.get("max")
    ) {
      if (
        (player.type === "curr" && query.get("curr") == "on") ||
        (player.type === "class" && query.get("class") == "on") ||
        (player.type === "allt" && query.get("allt") == "on")
      ) {
        return true;
      }
    } else {
      return false;
    }
  };

  const possiblePlayers = allPlayers.filter(fitsQuery);
  const getRound = () => {
    const p1options = [];
    const p2options = [];
    for (let i = 0; i < 3; i++) {
      const playerIdx = Math.floor(Math.random() * possiblePlayers.length);
      p1options.push(possiblePlayers[playerIdx]);
    }
    for (let i = 0; i < 3; i++) {
      const playerIdx = Math.floor(Math.random() * possiblePlayers.length);
      p2options.push(possiblePlayers[playerIdx]);
    }
    console.log(p1options);
    console.log(p2options);
  };

  getRound();

  return (
    <div>
      <div className="flex justify-around">
        <div>
          <h2 className="text-center">Player 1 Options:</h2>
          <ul className="flex gap-10">
            <button className="player-btn" onClick={() => handleChange(1)}>
              <li>
                <img src="https://picsum.photos/100" alt="" />
                <p>Player Name</p>
              </li>
            </button>
            <button className="player-btn" onClick={() => handleChange(1)}>
              <li>
                <img src="https://picsum.photos/100" alt="" />
                <p>Player Name</p>
              </li>
            </button>
            <button className="player-btn" onClick={() => handleChange(1)}>
              <li>
                <img src="https://picsum.photos/100" alt="" />
                <p>Player Name</p>
              </li>
            </button>
          </ul>
        </div>
        <div className="flex align-middle">
          <button>
            <RefreshIcon fontSize="large" />
          </button>
        </div>
        <div>
          <h2 className="text-center">Player 2 Options:</h2>
          <ul className="flex gap-10">
            <button className="player-btn" onClick={() => handleChange(2)}>
              <li>
                <img src="https://picsum.photos/100" alt="" />
                <p>Player Name</p>
              </li>
            </button>
            <button className="player-btn" onClick={() => handleChange(2)}>
              <li>
                <img src="https://picsum.photos/100" alt="" />
                <p>Player Name</p>
              </li>
            </button>
            <button className="player-btn" onClick={() => handleChange(2)}>
              <li>
                <img src="https://picsum.photos/100" alt="" />
                <p>Player Name</p>
              </li>
            </button>
          </ul>
        </div>
      </div>
      <button
        className="next-btn bg-black rounded-md p-5 px-10 text-xl text-white self-center invisible"
        type="submit"
      >
        NEXT
      </button>
    </div>
  );
}
