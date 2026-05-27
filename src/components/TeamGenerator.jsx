import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { GrNext } from "react-icons/gr";
import PlayerOptions from "./PlayerOptions";
import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { fetchPlayers, RateLimitError } from "../lib/nba2kapi";

export default function TeamGenerator({
  size,
  formData,
  handleReset,
  setTeamOne,
  setTeamTwo,
}) {
  const trackEvent = useMutation(api.analytics.trackEvent);

  const [possiblePlayers, setPossiblePlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryNonce, setRetryNonce] = useState(0);

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

  useEffect(() => {
    const teamTypes = ["curr", "class", "allt"].filter(
      (t) => formData.get(t) === "on"
    );
    const minRating = Number(formData.get("min"));
    const maxRating = Number(formData.get("max"));

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchPlayers({ teamTypes, minRating, maxRating })
      .then((players) => {
        if (!cancelled) setPossiblePlayers(players);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [formData, retryNonce]);

  const isValidQuery = possiblePlayers.length >= 6;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col justify-center">
        {loading && (
          <div className="bg-white/10 p-5 px-10 text-xl rounded-2xl text-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p>Loading players…</p>
          </div>
        )}

        {!loading && error && error instanceof RateLimitError && (
          <button
            className="reset-btn bg-yellow-700 p-5 px-10 text-xl rounded-2xl"
            type="button"
            onClick={() => setRetryNonce((n) => n + 1)}
          >
            <p>Too many requests. Try again in {error.retryAfter}s.</p>
            <p className="text-sm mt-2">CLICK TO RETRY</p>
          </button>
        )}

        {!loading && error && !(error instanceof RateLimitError) && (
          <button
            className="reset-btn bg-red-700 p-5 px-10 text-xl rounded-2xl"
            type="button"
            onClick={() => setRetryNonce((n) => n + 1)}
          >
            <p>Couldn't reach the player API.</p>
            <p className="text-sm mt-2">CLICK TO RETRY</p>
          </button>
        )}

        {!loading && !error && isValidQuery && (
          <button
            className="submit-btn bg-black p-5 px-10 text-xl flex items-center justify-center rounded-2xl"
            type="submit"
            onClick={handleOpen}
          >
            CONTINUE
            <GrNext />
          </button>
        )}

        {!loading && !error && !isValidQuery && (
          <button
            className="reset-btn bg-red-700 p-5 px-10 text-xl"
            type="button"
            onClick={() => handleReset()}
          >
            <p>Query did not return enough players</p>
            <p>CLICK TO RESET</p>
          </button>
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
