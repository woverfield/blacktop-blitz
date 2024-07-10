import React from "react";

export default function PlayerCardNoImage({ player }) {
  const getCardType = (overall) => {
    if (overall == 99) {
      return "overall-box dark-matter";
    } else if (overall >= 97) {
      return "overall-box galaxy-opal";
    } else if (overall >= 95) {
      return "overall-box pink-diamond";
    } else if (overall >= 92) {
      return "overall-box diamond";
    } else if (overall >= 90) {
      return "overall-box amethyst";
    } else if (overall >= 87) {
      return "overall-box ruby";
    } else if (overall >= 84) {
      return "overall-box sapphire";
    } else if (overall >= 80) {
      return "overall-box emerald";
    } else if (overall >= 75) {
      return "overall-box gold";
    } else if (overall >= 70) {
      return "overall-box silver";
    } else {
      return "overall-box bronze";
    }
  };

  return (
    <div className={"player-card flex flex-col justify-center gap-2"}>
        <header className="p-header w-full flex justify-center">
          <div className="flex items-center gap-2">
            <div className={getCardType(player.overall)}>
              <p className="text-xl font-bold">{player.overall}</p>
            </div>
            <div className="-mr-1">
              <img className="w-12" src={player.teamImg} alt="" />
            </div>
          </div>
        </header>
        <footer className="p-footer">
          <div className="footer-text">
            <p className="text-lg font-bold">{player.name}</p>
            <p className="text-sm">{player.team}</p>
          </div>
        </footer>
    </div>
  );
}
