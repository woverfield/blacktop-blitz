import React from "react";
import { FaGithub } from "react-icons/fa";

export default function About() {
  return (
    <div className="h-full flex justify-center items-center overflow-auto">
      <div className="text-white p-2 text-center md:w-1/2">
        <h1 className="md:text-7xl text-5xl">ABOUT</h1>
        <br />
        <p className="md:text-2xl text-xl">
          This is a little project I put together that started with my love for
          NBA 2k and especially the blacktop gamemode as I have fond memories
          playing with my brother. We always liked to randomize our teams and
          make things more interesting so if you enjoy that have fun using this
          site! This is inspired from another site that used to exist called
          2kblacktoprandomizer.com but is no longer active. The project is on my
          GitHub if you want to check it out more!
        </p>
        <div className="flex justify-center text-black my-10 font-medium flex-wrap">
          <a href="https://github.com/woverfield" target="_blank">
            <button className="menu-btn bg-white p-5 mx-2 text-xl rounded-2xl">
              <FaGithub className="size-16" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
