import React, { useState } from "react";
import TeamGenerator from "./TeamGenerator";
import { create } from "@mui/material/styles/createTransitions";

export default function TeamSelection(params) {
  const size = params;
  const [formInfo, setFormInfo] = useState(new Map());
  const [formSubmitted, setFormSubmitted] = useState(false);

  const search = (form) => {
    form.preventDefault();
    const newFormInfo = new Map(formInfo);
    newFormInfo.set("min", form.target[0].value);
    newFormInfo.set("max", form.target[1].value);
    const checkboxes = form.target.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      newFormInfo.set(checkbox.name, checkbox.checked ? "on" : "off");
    });
    setFormInfo(newFormInfo);
    handleSubmit();
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
  };

  const handleReset = () => {
    setFormSubmitted(false);
  };

  return (
    <main className="container mx-auto flex justify-between mt-20 text-white">
      <div className="section invisible">
        <h3 className="bg-white rounded-md p-5 px-10 text-xl">TEAM ONE</h3>
        <ul className="teamone">
          <li></li>
        </ul>
      </div>

      <div className="section query">
        <h3 className="bg-white rounded-md p-5 px-10 text-xl">QUERY</h3>
        <form onSubmit={search}>
          <ul className="mt-10">
            <li>
              <label>Min Overall:</label>
              <input name="min" type="text" className="text-black" placeholder="70" required/>
            </li>
            <li>
              <label>Max Overall:</label>
              <input name="max" type="text" className="text-black" placeholder="99"required/>
            </li>
            <li>
              <label>Current</label>
              <input name="curr" type="checkbox" className="text-black" />
            </li>
            <li>
              <label>Classic</label>
              <input name="class" type="checkbox" className="text-black" />
            </li>
            <li>
              <label>All-Time</label>
              <input name="allt" type="checkbox" className="text-black" />
            </li>
          </ul>
          <div className="flex flex-col justify-center">
            {formSubmitted === false && (
              <button
                className="form-submit submit-btn bg-black rounded-md p-5 px-10 text-xl"
                type="submit"
              >
                SUBMIT
              </button>
            )}
          </div>
        </form>
        {formSubmitted === true && (
          <TeamGenerator
            players={size}
            formData={formInfo}
            handleReset={() => handleReset()}
          />
        )}
      </div>

      <div className="section invisible">
        <h3 className="bg-white rounded-md p-5 px-10 text-xl">TEAM TWO</h3>
        <ul className="teamtwo">
          <li></li>
        </ul>
      </div>
    </main>
  );
}
