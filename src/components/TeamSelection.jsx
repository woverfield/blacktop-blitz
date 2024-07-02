import React, { useState } from "react";
import TeamQuery from "./TeamQuery";
import TeamVersus from "./TeamVersus";

export default function TeamSelection({ size }) {
  const [teamOne, setTeamOne] = useState([]);
  const [teamTwo, setTeamTwo] = useState([]);

  return (
    <div className="h-full flex justify-center">
      {teamOne.length !== size || teamTwo.length !== size ? (
        <TeamQuery
          size={size}
          setTeamOne={setTeamOne}
          setTeamTwo={setTeamTwo}
        />
      ) : (
        <TeamVersus teamOne={teamOne} teamTwo={teamTwo} />
      )}
    </div>
  );
}
