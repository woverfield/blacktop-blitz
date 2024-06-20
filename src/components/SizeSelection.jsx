import React, {useState} from "react";

export default function SizeSelection({onStateChange}) {
  const [nextSection, setNextSection] = useState("");

  const handleChange = () => {
    setNextSection("TeamSelection");
    onStateChange("TeamSelection");
  };

  return (
    <main className="flex h-full flex-col justify-center">
      <div className="container mx-auto flex flex-wrap justify-center gap-10 mb-20">
        <button onClick={handleChange}>
          <div className="player-count" id="twos">
            <h3>2v2</h3>
          </div>
        </button>
        <button onClick={handleChange}>
          <div className="player-count" id="ones">
            <h3>1v1</h3>
          </div>
        </button>
        <button onClick={handleChange}>
          <div className="player-count" id="threes">
            <h3>3v3</h3>
          </div>
        </button>
        <button onClick={handleChange}>
          <div className="player-count" id="fours">
            <h3>4v4</h3>
          </div>
        </button>
        <button onClick={handleChange}>
          <div className="player-count" id="fives">
            <h3>5v5</h3>
          </div>
        </button>
      </div>
    </main>
  );
}
