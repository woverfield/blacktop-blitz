import React, { useState } from "react";
import TeamGenerator from "./TeamGenerator";
import { motion } from "framer-motion";

export default function TeamSelection({ size, setTeamOne, setTeamTwo }) {
  const [formInfo, setFormInfo] = useState(new Map());
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validate = (form) => {
    form.preventDefault();

    let minimumChecked = false;
    const checkboxes = form.target.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        minimumChecked = true;
      }
    });

    if (form.target[0].value < 0 || form.target[0].value > 99) {
      console.log("Make sure overall is no higher than 99 and no lower than 0");
    } else if (form.target[1].value < 0 || form.target[1].value > 99) {
      console.log("Make sure overall is no higher than 99 and no lower than 0");
    } else if (!minimumChecked) {
      console.log("Check at least one box!");
    } else {
      search(form);
    }
  };

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
    <main className="container flex justify-center items-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="section query p-3">
          <h3 className="p-5 px-10 text-7xl text-white rounded-2xl font-serif">QUERY</h3>
          <form onSubmit={validate} autoComplete="off">
            <ul className="mt-10">
              <li>
                <label>Min Overall:</label>
                <input
                  name="min"
                  type="text"
                  className="text-black"
                  placeholder="60"
                  required
                />
              </li>
              <li>
                <label>Max Overall:</label>
                <input
                  name="max"
                  type="text"
                  className="text-black"
                  placeholder="99"
                  required
                />
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
                  className="form-submit submit-btn bg-white p-5 px-10 text-xl text-black rounded-2xl"
                  type="submit"
                >
                  SUBMIT
                </button>
              )}
            </div>
          </form>
          {formSubmitted === true && (
            <TeamGenerator
              formData={formInfo}
              size={size}
              handleReset={() => handleReset()}
              setTeamOne={setTeamOne}
              setTeamTwo={setTeamTwo}
            />
          )}
        </div>
      </motion.div>
    </main>
  );
}
