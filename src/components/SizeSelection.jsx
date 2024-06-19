import React from "react";

export default function SizeSelection() {
  return (
    <main>
      <div className="container mx-auto flex flex-wrap justify-center gap-10 mb-20">
        <button>
          <div className="player-count" id="twos">
            <h3>2v2</h3>
          </div>
        </button>
        <button>
          <div className="player-count" id="ones">
            <h3>1v1</h3>
          </div>
        </button>
        <button>
          <div className="player-count" id="threes">
            <h3>3v3</h3>
          </div>
        </button>
        <button>
          <div className="player-count" id="fours">
            <h3>4v4</h3>
          </div>
        </button>
        <button>
          <div className="player-count" id="fives">
            <h3>5v5</h3>
          </div>
        </button>
      </div>
    </main>
  );
}
