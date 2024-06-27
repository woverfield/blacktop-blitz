import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { GrNext } from "react-icons/gr";
import PlayerOptions from "./PlayerOptions";
import allPlayers from "../data/players.json";


export default function TeamGenerator({ playerCount, formData, handleReset }) {
  // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleReset();
  };

  const fitsQuery = (player) => {
    console.log(player.overall);
    console.log(formData.get("min"));
    if (
      player.overall >= formData.get("min") &&
      player.overall <= formData.get("max")
    ) {
      if (
        (player.type === "curr" && formData.get("curr") == "on") ||
        (player.type === "class" && formData.get("class") == "on") ||
        (player.type === "allt" && formData.get("allt") == "on")
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
  };

  const getOptions = () => {
    const options = [];
    for (let i = 0; i < 3; i++) {
      const playerIdx = Math.floor(Math.random() * possiblePlayers.length);
      options.push(possiblePlayers[playerIdx]);
    }
    return options;
  };
  const p1options = getOptions();
  const p2options = getOptions();


  return (
    <div className="flex flex-col justify-center">
      <button
        className="submit-btn bg-black rounded-md p-5 px-10 text-xl flex items-center justify-center"
        type="submit"
        onClick={handleOpen}
      >
        CONTINUE
        <GrNext />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex h-full flex-col justify-center items-center ">
          <div className="flex flex-col container justify-center mx-auto bg-white">
            <PlayerOptions size={playerCount} formData={formData} p1options={p1options} p2options={p2options}/>
          </div>
        </div>
      </Modal>
    </div>
  );
}
