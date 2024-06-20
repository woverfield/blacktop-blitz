import React, { useState } from "react";
import MainMenu from "./MainMenu";
import SizeSelection from "./SizeSelection";
import TeamSelection from "./TeamSelection";

export default function MainDisplay() {
  const [displayState, setDisplayState] = useState("MainMenu");

  const handleStateChange = (value) => {
    console.log(value);
    setDisplayState(value);
  };

  return (
    <main className="h-full">
      {displayState === "SizeSelection" && (
        <SizeSelection onStateChange={handleStateChange} />
      )}
      {displayState === "MainMenu" && (
        <MainMenu onStateChange={handleStateChange} />
      )}
      {displayState === "TeamSelection" && <TeamSelection />}
    </main>
  );
}
