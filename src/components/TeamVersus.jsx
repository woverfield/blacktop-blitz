import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function TeamVersus({ teamOne, teamTwo }) {
  return (
    <main className="container mx-auto h-full flex flex-col justify-evenly text-white">
      <div className="row self-end flex items-center gap-10">
        {teamOne.map((player, idx) => {
          return (
            <Card sx={{ width: 180, border: 3, borderColor: "white"}}>
              <CardMedia
                component="img"
                height="140"
                image={player.img}
                alt="green iguana"
              />
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <p>{player.name}</p>
                  <div className="border border-black w-full"></div>
                  <p>{player.overall}</p>
                  <div className="border border-black w-full"></div>
                  <p>{player.team}</p>
                  <div className="border border-black w-full"></div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        <h1 className="text-5xl">TEAM ONE</h1>
      </div>
      <div className="border border-white w-full"></div>
      <div className="row flex items-center gap-10">
        <h1 className="text-5xl">TEAM TWO</h1>
        {teamTwo.map((player, idx) => {
          return (
            <Card sx={{ width: 180, border: 3, borderColor: "white"}}>
              <CardMedia
                component="img"
                height="140"
                image={player.img}
                alt="green iguana"
              />
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <p>{player.name}</p>
                  <div className="border border-black w-full"></div>
                  <p>{player.overall}</p>
                  <div className="border border-black w-full"></div>
                  <p className="">{player.team}</p>
                  <div className="border border-black w-full"></div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="self-center mb-20">
        <Link to="/">
          <button
            className="done-btn bg-black rounded-md p-5 px-10 text-xl my-5 text-white self-center"
            type="submit"
          >
            PLAY AGAIN?
          </button>
        </Link>
      </div>
    </main>
  );
}
