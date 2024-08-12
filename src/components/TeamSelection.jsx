import React, { useState } from "react";
import TeamQuery from "./TeamQuery";
import TeamVersus from "./TeamVersus";

export default function TeamSelection() {
  const [teamOne, setTeamOne] = useState([]);
  const [teamTwo, setTeamTwo] = useState([]);

  const resetTeams = () => {
    setTeamOne([]);
    setTeamTwo([]);
  }

  return (
    <div className="h-full flex justify-center">
      {teamOne.length > 0 && teamTwo.length > 0 ? (
        <TeamVersus resetTeams={resetTeams} teamOne={teamOne} teamTwo={teamTwo} />
      ) : (
        <TeamQuery setTeamOne={setTeamOne} setTeamTwo={setTeamTwo} />
      )}
    </div>
  );
}
