import React, { useState, useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import PlayerCard from "./PlayerCard";
import PlayerCardNoImage from "./PlayerCardNoImage";

export default function PlayerOptions({
  size,
  possiblePlayers,
  setTeamOne,
  setTeamTwo,
}) {
  // round selection state
  const [p1Ready, setp1Ready] = useState(false);
  const [p2Ready, setp2Ready] = useState(false);
  const [p1Focus, setp1Focus] = useState(0);
  const [p2Focus, setp2Focus] = useState(0);
  const [round, setRound] = useState(1);
  const [teamOneInner, setTeamOneInner] = useState([]);
  const [teamTwoInner, setTeamTwoInner] = useState([]);

  const getOptions = () => {
    const options = new Set();
    while (options.size < 3) {
      const playerIdx = Math.floor(Math.random() * possiblePlayers.length);
      options.add(possiblePlayers[playerIdx]);
    }
    return Array.from(options);
  };

  const [p1options, setp1Options] = useState(getOptions());
  const [p2options, setp2Options] = useState(getOptions());

  const handleChange = (player, btn) => {
    if (player === 1) {
      if (p1Focus === btn) {
        setp1Focus(0);
      } else {
        setp1Focus(btn);
      }
    } else if (player === 2) {
      if (p2Focus === btn) {
        setp2Focus(0);
      } else {
        setp2Focus(btn);
      }
    }
  };

  const handleNext = () => {
    teamOneInner.push(p1options[p1Focus - 1]);
    teamTwoInner.push(p2options[p2Focus - 1]);
    setRound(round + 1);
    refreshOptions();
  };

  const handleDone = () => {
    teamOneInner.push(p1options[p1Focus - 1]);
    teamTwoInner.push(p2options[p2Focus - 1]);
    setTeamOne(teamOneInner);
    setTeamTwo(teamTwoInner);
  };

  useEffect(() => {
    if (p1Focus !== 0) {
      setp1Ready(true);
    } else {
      setp1Ready(false);
    }
    if (p2Focus !== 0) {
      setp2Ready(true);
    } else {
      setp2Ready(false);
    }
  }, [p1Focus, p2Focus]);

  const refreshOptions = () => {
    setp1Focus(0);
    setp1Options(getOptions());
    setp2Focus(0);
    setp2Options(getOptions());
  };

  return (
    <div className="flex flex-col p-5 overflow-auto">
      <div className="flex justify-around">
        <div className="pt-10">
          <h2 className="text-center options-text">Player 1 Options:</h2>
          <ul className="flex gap-5 flex-wrap justify-center pt-2">
            {p1options.map((player, idx) => {
              return (
                <button
                  key={idx}
                  className={
                    p1Focus === idx + 1 ? "player-btn focus-btn" : "player-btn"
                  }
                  onClick={() => handleChange(1, idx + 1)}
                >
                  {player.playerImg ? (
                  <PlayerCard player={player} />
                ) : (
                  <PlayerCardNoImage player={player} />
                )}
                </button>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <div>
            <h2 className="options-text text-center">
              ROUND {round} {round === size && "(FINAL)"}
            </h2>
            <p className="text-center">Each Person Draft One Player</p>
          </div>
          <div className="flex flex-col h-full justify-between">
            <button className="mt-10" onClick={refreshOptions}>
              <RefreshIcon fontSize="large" />
            </button>
            {round < size && p1Ready === true && p2Ready === true && (
              <button
                className="next-btn bg-black p-5 px-10 text-xl my-5 text-white self-center rounded-2xl"
                type="submit"
                onClick={handleNext}
              >
                NEXT
              </button>
            )}
            {round === size && p1Ready === true && p2Ready === true && (
              <button
                className="done-btn bg-black p-5 px-10 text-xl my-5 text-white self-center rounded-2xl"
                type="submit"
                onClick={handleDone}
              >
                DONE
              </button>
            )}
          </div>
        </div>
        <div className="pt-10">
          <h2 className="text-center options-text">Player 2 Options:</h2>
          <ul className="flex gap-5 flex-wrap justify-center pt-2">
            {p2options.map((player, idx) => {
              return (
                <button
                  key={idx}
                  className={
                    p2Focus === idx + 1 ? "player-btn focus-btn" : "player-btn"
                  }
                  onClick={() => handleChange(2, idx + 1)}
                >
                  {player.playerImg ? (
                  <PlayerCard player={player} />
                ) : (
                  <PlayerCardNoImage player={player} />
                )}
                </button>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
