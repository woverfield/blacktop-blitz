import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { GrNext } from "react-icons/gr";
import PlayerOptions from "./PlayerOptions";

export default function TeamGenerator({ players, formData, handleReset }) {
  // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleReset();
  };


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
            <PlayerOptions size={players} formData={formData}/>
          </div>
        </div>
      </Modal>
    </div>
  );
}
