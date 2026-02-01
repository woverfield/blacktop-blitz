import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { GrNext } from "react-icons/gr";
import PlayerOptions from "./PlayerOptions";
import allPlayers from "../data/players.json";
import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function TeamGenerator({
  size,
  formData,
  handleReset,
  setTeamOne,
  setTeamTwo,
}) {
  const trackEvent = useMutation(api.analytics.trackEvent);

  // modal state
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    // Track draft started
    trackEvent({
      eventType: "draft_started",
      metadata: { gameSize: `${size}v${size}` },
    });
  };
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

  const isValidQuery = possiblePlayers.length >= 6;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col justify-center">
        {isValidQuery ? (
          <button
            className="submit-btn bg-black p-5 px-10 text-xl flex items-center justify-center rounded-2xl"
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
          className="overflow-y-auto"
        >
          <div className="flex h-full flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col container justify-center mx-auto p-10">
                <PlayerOptions
                  size={size}
                  formData={formData}
                  possiblePlayers={possiblePlayers}
                  setTeamOne={setTeamOne}
                  setTeamTwo={setTeamTwo}
                  handleClose={handleClose}
                />
              </div>
            </motion.div>
          </div>
        </Modal>
      </div>
    </motion.div>
  );
}
