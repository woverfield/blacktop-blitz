import React, {useState} from "react";
import BlacktopText from "../img/BLACKTOP.svg";
import BlitzText from "../img/BLITZ.svg";

export default function MainMenu({onStateChange}) {
  const [nextSection, setNextSection] = useState('');

  const handleChange = () => {
    setNextSection('SizeSelection');
    onStateChange('SizeSelection')
    console.log(nextSection);
  }

  return (
    <main>
      {/*Title*/}
      <div className="container mx-auto flex flex-col items-center gap-5">
        <img src={BlacktopText} alt="" className="max-w-xl" />
        <img src={BlitzText} alt="" className="max-w-lg" />
      </div>
      {/*Buttons*/}
      <div className="flex justify-center text-black gap-20 my-20 font-medium">
        <button onClick={handleChange} className="bg-white rounded-md p-5 px-10 text-xl">
          <h3>QUICK PLAY</h3>
        </button>
        <button className="bg-white rounded-md p-5 px-10 text-xl">
          <h3>TOURNAMENT</h3>
        </button>
      </div>
    </main>
  );
}
