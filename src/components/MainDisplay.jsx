import React, { useState } from "react";
import MainMenu from "./MainMenu";
import SizeSelection from "./SizeSelection";

export default function MainDisplay() {  
  const [displayState, setDisplayState] = useState("");

  const handleStateChange = (value) => {
    console.log(value);
    setDisplayState(value);
  };

  return (
    <main className="flex h-full flex-col justify-center">
      {displayState === "SizeSelection" ? (
        <SizeSelection />
      ) : (
        <MainMenu 
        onStateChange={handleStateChange}
        />
      )}
    </main>
  );
}
