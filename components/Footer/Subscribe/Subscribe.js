import axios from "axios";

import { useState } from "react";

import classes from "./Subscribe.module.scss";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const subscribe = async (e) => {
    e.preventDefault();
    setState("Loading");

    try {
      const response = await axios.post("/api/subscribe", { email });
      console.log(response);
      setState("Success");
      setEmail("");
    } catch (e) {
      console.log(e.response.data.error);
      setErrorMsg(e.response.data.error);
      setState("Error");
    }
  };

  return (
    <>
      <form onSubmit={subscribe} className={classes.Form}>
        <input
          required
          type="email"
          name="email"
          id="email-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={state === "Loading"}
          type="submit"
          onClick={subscribe}
        >
          &rarr;
        </button>
      </form>
      {state === "Error" && (
        <div className={classes.Form__error}>{errorMsg}</div>
      )}
      {state === "Success" && (
        <div className={classes.Form__success}>
          Awesome, you&apos;ve been subscribed!
        </div>
      )}
    </>
  );
};

export default Subscribe;
