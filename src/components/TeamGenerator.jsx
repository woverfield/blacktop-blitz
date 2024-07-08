import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { GrNext } from "react-icons/gr";
import PlayerOptions from "./PlayerOptions";
import allPlayers from "../data/currplayers.json";

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
    }
    return false;
  };

  const possiblePlayers = allPlayers.filter(fitsQuery);

  const isValidQuery = possiblePlayers.length >= 3;

  return (
    <div className="flex flex-col justify-center">
      {isValidQuery ? (
        <button
          className="submit-btn bg-black p-5 px-10 text-xl flex items-center justify-center"
          type="submit"
          onClick={handleOpen}
        >
          CONTINUE
          <GrNext />
        </button>
      ) : (
        <>
          
          <button
            className="reset-btn bg-red-700 p-5 px-10 text-xl"
            type="button"
            onClick={() => handleReset()}
          >
            <p>Query did not return enough players</p>
            <p>CLICK TO RESET</p>
          </button>
        </>
      )}
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
