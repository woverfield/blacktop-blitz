import React from "react";
import { Link } from "react-router-dom";
import BlacktopText from "../img/BLACKTOP.svg";
import BlitzText from "../img/BLITZ.svg";
import { motion } from "framer-motion";

export default function MainMenu({}) {
  return (
    <main className="flex h-full flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/*Title*/}
        <div className="container mx-auto flex flex-col items-center gap-5 max-w-2xl p-3">
          <img src={BlacktopText} alt="" className="w-full" />
          <img src={BlitzText} alt="" className="w-7/12" />
        </div>
        {/*Buttons*/}
        <div className="flex justify-center text-black gap-20 my-20 font-medium flex-wrap">
          <Link to="/blacktop-blitz/qplay">
            <motion.button className="menu-btn bg-white py-5 px-28 mx-2 text-xl rounded-2xl" initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}>
              <h3>QUICK PLAY</h3>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
