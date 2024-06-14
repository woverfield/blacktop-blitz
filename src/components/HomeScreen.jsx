import React from "react";
import Navigation from "./Navigation";
import MainMenu from "./MainMenu";

export default function HomeScreen() {
  return (
    <main>
      <div className="background">
        <Navigation />
        <MainMenu />
      </div>
    </main>
  );
}
