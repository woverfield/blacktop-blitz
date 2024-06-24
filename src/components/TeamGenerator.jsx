import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function TeamGenerator() {
    // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        document.querySelector('.next-btn').style.visibility = 'visible';
    }
  }, [p1Ready, p2Ready]);

  return (
    <div className="flex flex-col justify-center">
      <button
        className="submit-btn bg-black rounded-md p-5 px-10 text-xl"
        type="submit"
        onClick={handleOpen}
      >
        SUBMIT
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex h-full flex-col justify-center items-center ">
          <div className="flex flex-col container mx-auto bg-white">
            <h2 className="text-center">Round 1</h2>
            <p className="text-center italic">Each Person Draft One Player</p>
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
        </div>
      </Modal>
    </div>
  );
}
