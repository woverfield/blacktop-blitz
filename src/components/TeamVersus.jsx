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
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={player.img}
                alt="green iguana"
              />
              <CardContent>
                <div className="flex flex-col items-center">
                  <h1>{player.name}</h1>
                  <p>{player.overall}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
        <h1>Team One</h1>
      </div>
      <div className="self-center">
        <h1>VERSUS</h1>
      </div>
      <div className="row flex items-center gap-10">
        <h1>Team Two</h1>
        {teamTwo.map((player, idx) => {
          return (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={player.img}
                alt="green iguana"
              />
              <CardContent>
                <div className="flex flex-col items-center">
                  <h1>{player.name}</h1>
                  <p>{player.overall}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="self-center">
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
