import React from "react";
import { FaGithub, FaStar, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="h-full flex justify-center lg:items-center sm:items-start">
      <div className="text-white p-2 text-center md:w-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="md:text-7xl text-5xl font-serif">ABOUT</h1>
          <br />
          <p className="md:text-2xl text-xl">
            This is the best free NBA 2K team randomizer for Blacktop mode! I put this together
            because of my love for NBA 2K and especially the blacktop gamemode. My brother and I
            always liked to randomize our teams and make things more interesting. This 2K blacktop
            randomizer is inspired by the old 2kblacktoprandomizer.com site that's no longer active.
            If you enjoy randomizing your NBA 2K teams, have fun using this site!
          </p>
          <div className="flex justify-center text-black my-10 font-medium flex-wrap gap-4">
            <a href="https://github.com/woverfield/blacktop-blitz" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="menu-btn bg-white p-5 text-xl rounded-2xl flex items-center gap-2"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              >
                <FaStar className="size-6" />
                <span>Star on GitHub</span>
              </motion.button>
            </a>
            <a href="https://buymeacoffee.com/wkoverfield" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="menu-btn bg-white p-5 text-xl rounded-2xl flex items-center gap-2"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              >
                <FaHeart className="size-6" />
                <span>Buy Me a Coffee</span>
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
