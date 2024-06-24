import React from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

export default function SizeSelection() {
  return (
    <main className="flex h-full flex-col justify-center">
      <div className="container mx-auto flex flex-wrap justify-center mb-20">
        <Carousel />
      </div>
    </main>
  );
}
