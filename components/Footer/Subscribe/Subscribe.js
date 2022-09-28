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
      setState("Success");
      setEmail("");
    } catch (e) {
      e.response.data.status === 400
        ? setErrorMsg(
            `There was an error subscribing to the newsletter. Email us at info@arcadia.church and we'll add you to the list.`
          )
        : setErrorMsg(e.response.data.config.data);
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
