import React, { useState, useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function PlayerOptions({ size, formData, getOptions, p1options, p2options}) {
  const gameSize = size;

  // round selection state
  const [p1Ready, setp1Ready] = useState(false);
  const [p2Ready, setp2Ready] = useState(false);
  const [p1Focus, setp1Focus] = useState(0);
  const [p2Focus, setp2Focus] = useState(0);
  const [round, setRound] = useState(1);

  const handleChange = (player, btn) => {
    if (player === 1) {
      if (p1Focus === btn) {
        setp1Focus(0);
        setp1Ready(false);
      } else {
        setp1Focus(btn);
        setp1Ready(true);
      }
    } else if (player === 2) {
      if (p2Focus === btn) {
        setp2Focus(0);
        setp2Ready(false);
      } else {
        setp2Focus(btn);
        setp2Ready(true);
      }
    }
  };

  const handleNext = () => {
    setRound(round + 1);
    refreshOptions();
  }

  const refreshOptions = () => {
    p1options = getOptions;
    p2options = getOptions;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-around">
        <div className="pt-10">
          <h2 className="text-center">Player 1 Options:</h2>
          <ul className="flex gap-10">
            <button className={p1Focus === 1 ? "player-btn focus-btn" : "player-btn"} onClick={() => handleChange(1, 1)}>
              <li>
                <img src="https://picsum.photos/100" alt="" />
                <p>{p1options[0].name}</p>
              </li>
            </button>
            <button className={p1Focus === 2 ? "player-btn focus-btn" : "player-btn"} onClick={() => handleChange(1, 2)}>
              <li>
                <img src="https://picsum.photos/100" alt="" />
                <p>{p1options[1].name}</p>
              </li>
            </button>
            <button className={p1Focus === 3 ? "player-btn focus-btn" : "player-btn"} onClick={() => handleChange(1, 3)}>
              <li>
                <img src="https://picsum.photos/100" alt="" />
                <p>{p1options[2].name}</p>
              </li>
            </button>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <h2>Round {round}</h2>
          <p className="text-center">Each Person Draft One Player</p>
          <button className="mt-10" onClick={refreshOptions()}>
            <RefreshIcon fontSize="large" />
          </button>
          {p1Ready === true && p2Ready === true && (
            <button
              className="next-btn bg-black rounded-md p-5 px-10 text-xl my-5 text-white self-center"
              type="submit"
              onClick={handleNext()}
            >
              NEXT
            </button>
          )}
        </div>
        <div className="pt-10">
          <h2 className="text-center">Player 2 Options:</h2>
          <ul className="flex gap-10">
            <button className={p2Focus === 1 ? "player-btn focus-btn" : "player-btn"} onClick={() => handleChange(2, 1)}>
              <li>
                <img src="https://picsum.photos/100" alt="" />
                <p>{p2options[0].name}</p>
              </li>
            </button>
            <button className={p2Focus === 2 ? "player-btn focus-btn" : "player-btn"} onClick={() => handleChange(2, 2)}>
              <li>
                <img src="https://picsum.photos/100" alt="" />
                <p>{p2options[1].name}</p>
              </li>
            </button>
            <button className={p2Focus === 3 ? "player-btn focus-btn" : "player-btn"} onClick={() => handleChange(2, 3)}>
              <li>
                <img src="https://picsum.photos/100" alt="" />
                <p>{p2options[2].name}</p>
              </li>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
