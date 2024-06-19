import React from "react";
import MainDisplay from "./MainDisplay";
import Navigation from "./Navigation";

export default function HomeScreen() {
  return (
    <main>
      <div className="background">
        <Navigation />
        <MainDisplay />
      </div>
    </main>
  );
}
