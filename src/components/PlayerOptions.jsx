import React, { useState, useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IoMdClose } from "react-icons/io";
import PlayerCard from "./PlayerCard";
import PlayerCardNoImage from "./PlayerCardNoImage";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function PlayerOptions({
  size,
  possiblePlayers,
  setTeamOne,
  setTeamTwo,
  handleClose,
}) {
  const trackEvent = useMutation(api.analytics.trackEvent);
  const [p1Ready, setp1Ready] = useState(false);
  const [p2Ready, setp2Ready] = useState(false);
  const [p1Focus, setp1Focus] = useState(0);
  const [p2Focus, setp2Focus] = useState(0);
  const [round, setRound] = useState(1);
  const [teamOneInner] = useState([]);
  const [teamTwoInner] = useState([]);

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

    // Track player selected
    trackEvent({
      eventType: "player_selected",
      metadata: {
        roundNumber: round,
        totalRounds: parseInt(size),
      },
    });

    setRound(round + 1);
    refreshOptions();
  };

  const handleDone = () => {
    teamOneInner.push(p1options[p1Focus - 1]);
    teamTwoInner.push(p2options[p2Focus - 1]);
    setTeamOne(teamOneInner);
    setTeamTwo(teamTwoInner);

    // Track draft completed
    trackEvent({
      eventType: "draft_completed",
      metadata: {
        gameSize: `${size}v${size}`,
        totalRounds: parseInt(size),
      },
    });
  };

  const handleAbandon = () => {
    // Track draft abandoned
    trackEvent({
      eventType: "draft_abandoned",
      metadata: {
        roundNumber: round,
        totalRounds: parseInt(size),
      },
    });
    handleClose();
  };

  useEffect(() => {
    setp1Ready(p1Focus !== 0);
    setp2Ready(p2Focus !== 0);
  }, [p1Focus, p2Focus]);

  const refreshOptions = () => {
    setp1Focus(0);
    setp1Options(getOptions());
    setp2Focus(0);
    setp2Options(getOptions());
  };

  const isButtonVisible = p1Ready && p2Ready;

  return (
    <div className="text-white flex flex-col items-center p-5 max-h-screen">
      <div className="flex items-center justify-between w-full mb-4">
        <button className="" onClick={refreshOptions}>
          <RefreshIcon fontSize="large" />
        </button>
        <div>
          <h2 className="options-text text-center font-serif text-4xl">
            ROUND {round} {round === size && "(FINAL)"}
          </h2>
          <p className="text-center">Each Person Draft One Player</p>
        </div>
        <button className="" onClick={handleAbandon}>
          <IoMdClose size="35" />
        </button>
      </div>
      <div className="player-options flex gap-36 flex-wrap justify-center">
        <div className="p1-options">
          <h2 className="text-center options-text font-serif text-2xl mb-2">
            Player 1 Options:
          </h2>
          <ul className="flex flex-col gap-5">
            {p1options.map((player, idx) => (
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
            ))}
          </ul>
        </div>
        <div className="p2-options">
          <h2 className="text-center options-text font-serif text-2xl mb-2">
            Player 2 Options:
          </h2>
          <ul className="flex flex-col gap-5">
            {p2options.map((player, idx) => (
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
            ))}
          </ul>
        </div>
      </div>
      <button
        className={`next-done-btn bg-white p-5 px-10 text-xl my-5 text-black self-center rounded-2xl ${
          isButtonVisible ? "" : "invisible"
        }`}
        type="submit"
        onClick={round === parseInt(size) ? handleDone : handleNext}
      >
        {round === parseInt(size) ? "DONE" : "NEXT"}
      </button>
    </div>
  );
}
