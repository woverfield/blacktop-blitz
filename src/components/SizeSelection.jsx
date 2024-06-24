import React from "react";
import { Link } from "react-router-dom";
import TeamSelection from "./TeamSelection";

export default function SizeSelection() {
  return (
    <main className="flex h-full flex-col justify-center">
      <div className="container mx-auto flex flex-wrap justify-center mb-20">
        <Link to={"2"}>
          <button>
            <div className="player-count" id="twos">
              <h3>2v2</h3>
            </div>
          </button>
        </Link>
        <Link to={"1"}>
          <button>
            <div className="player-count" id="ones">
              <h3>1v1</h3>
            </div>
          </button>
        </Link>
        <Link to={"3"}>
          <button>
            <div className="player-count" id="threes">
              <h3>3v3</h3>
            </div>
          </button>
        </Link>
        <Link to={"4"}>
          <button>
            <div className="player-count" id="fours">
              <h3>4v4</h3>
            </div>
          </button>
        </Link>
        <Link to={"5"}>
          <button>
            <div className="player-count" id="fives">
              <h3>5v5</h3>
            </div>
          </button>
        </Link>
      </div>
    </main>
  );
}
