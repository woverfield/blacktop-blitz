import React from "react";

export default function PlayerCard({ player }) {
  const getCardType = (overall) => {
    if (overall === 99) {
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

  const formatMiscInfo = (playerMisc) => {
    let formattedInfo = playerMisc.join(" | ");
    return formattedInfo;
  };

  return (
    <div
      className={
        "player-card player-card-photo flex flex-col h-72 w-44 justify-between relative overflow-hidden"
      }
    >
      {/*
        Use a real <img> with referrerPolicy="no-referrer" so 2kratings.com's
        hot-link protection (which 403s on third-party Referer) passes. CSS
        background-image inherits the document's referrer policy and is less
        reliable across browsers — the element-level attribute is the bulletproof fix.
      */}
      <img
        src={player.playerImg}
        alt={player.name}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="lazy"
      />
      <header className="p-header relative z-10">
        <div className="flex flex-col items-end gap-2">
          <div className={getCardType(player.overall)}>
            <p className="text-xl font-bold">{player.overall}</p>
          </div>
          <div className="-mr-1">
            <img className="w-12" src={player.teamImg} alt="" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>
      <footer className="p-footer-photo relative z-10">
        <div className="footer-text">
          <p className="text-lg font-bold">{player.name}</p>
          <p>{formatMiscInfo(player.playerMisc)}</p>
          <p className="text-sm">{player.team}</p>
        </div>
      </footer>
    </div>
  );
}
