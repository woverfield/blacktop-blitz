import React from "react";

export default function TeamSelection() {
  return (
    <main className="container mx-auto flex justify-between mt-20 text-white">
      <div className="section teamone">
        <h3 className="bg-white rounded-md p-5 px-10 text-xl">TEAM ONE</h3>
        <ul>
            <li></li>
        </ul>
      </div>

      <div className="section query">
        <h3 className="bg-white rounded-md p-5 px-10 text-xl">QUERY</h3>
        <ul className="mt-10">
            <li>
                <label>Min Overall:</label>
                <input type="text" className="text-black"/>
            </li>
            <li>
                <label>Max Overall:</label>
                <input type="text" className="text-black"/>
            </li>
            <li>
                <label>Current</label>
                <input type="checkbox" className="text-black"/>
            </li>
            <li>
                <label>Classic</label>
                <input type="checkbox" className="text-black"/>
            </li>
            <li>
                <label>All-Time</label>
                <input type="checkbox" className="text-black"/>
            </li>
        </ul>
      </div>

      <div className="section teamtwo">
        <h3 className="bg-white rounded-md p-5 px-10 text-xl">TEAM TWO</h3>
        <ul>
            <li></li>
        </ul>
      </div>
    </main>
  );
}
