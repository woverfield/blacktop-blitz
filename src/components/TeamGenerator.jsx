import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { GrNext } from "react-icons/gr";
import PlayerOptions from "./PlayerOptions";
import allPlayers from "../data/players.json";

export default function TeamGenerator({
  size,
  formData,
  handleReset,
  setTeamOne,
  setTeamTwo,
}) {
  // modal state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleReset();
  };

  const fitsQuery = (player) => {
    if (
      player.overall >= formData.get("min") &&
      player.overall <= formData.get("max")
    ) {
      if (
        (player.type === "curr" && formData.get("curr") === "on") ||
        (player.type === "class" && formData.get("class") === "on") ||
        (player.type === "allt" && formData.get("allt") === "on")
      ) {
        return true;
      }
    } else {
      return false;
    }
  };

  const possiblePlayers = allPlayers.filter(fitsQuery);

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
            <PlayerOptions
              size={size}
              formData={formData}
              possiblePlayers={possiblePlayers}
              setTeamOne={setTeamOne}
              setTeamTwo={setTeamTwo}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
