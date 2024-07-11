import React from "react";
import { MdForum } from "react-icons/md";

export default function Feedback() {
  return (
    <div className="h-full flex justify-center items-center overflow-auto">
      <div className="text-white p-2 text-center md:w-1/2">
        <h1 className="md:text-7xl text-5xl">FEEDBACK</h1>
        <br />
        <p className="md:text-2xl text-xl">
          First, thank you for checking out my application! Feedback is welcome
          and if you see any bugs or have suggestions for improvements please
          leave them in the GitHub discussion board for the repository.
        </p>
        <div className="flex justify-center text-black my-10 font-medium flex-wrap">
          <a href="https://github.com/woverfield/blacktop-blitz/discussions" target="_blank">
            <button className="menu-btn bg-white p-5 mx-2 text-xl rounded-2xl">
              <MdForum className="size-16" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
