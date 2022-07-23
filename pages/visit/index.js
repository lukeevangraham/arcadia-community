import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Sections from "../../components/Sections/Sections";
import Button from "../../components/UI/Button/Button";
import { fetchAPI } from "../../lib/api";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, visitData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    fetchAPI("/visit?populate=deep"),
  ]);
  return {
    props: { globalData, visitData },
    revalidate: 1,
  };
}

const Visit = ({ globalData, visitData }) => {
  let [messageStatus, setMessageStatus] = useState();

  const sendMessage = async (e) => {
    e.preventDefault();

    setMessageStatus(1);

    const res = await fetch("/api/planVisit", {
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        date: e.target.date.value,
        kids: e.target.kids.value,
        reachOut: e.target.reachOut.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log("RES: ", result);
    result.status == 200 ? setMessageStatus(200) : null;
  };

  let requestForm = "";

  switch (messageStatus) {
    case 0:
      break;
    case 200:
      requestForm = (
        <div className={classes.Visit__success}>
          <h3>Your form was successfully delivered</h3>
        </div>
      );
      break;
    case 1:
      requestForm = <div className={classes.Visit__success}>Sending...</div>;
      break;
    default:
      requestForm = (
        <>
          <div className={classes.Visit__topText}></div>
          <form onSubmit={sendMessage} className={classes.Visit__form}>
            <input
              className={classes.marginBottom}
              type="text"
              name="name"
              placeholder="Your First & Last name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              className={classes.marginBottom}
            />

            <input
              type="text"
              name="date"
              placeholder="Date you plan to visit? Example: June 10"
            />

            <p>
              Tell us a little bit about your family...Do you have kids between
              3 months and Grade 8?
            </p>

            <div className={classes.Visit__form_radioGroup}>
              <input type="radio" name="kids" id="yesKids" value={"Yes"} />
              <label htmlFor="yesKids">Yes</label>
              <input type="radio" name="kids" id="noKids" value={"No"} />
              <label htmlFor="noKids">No</label>
            </div>

            <p>
              Would you like one of our pastors to personally reach out to you?
            </p>
            <div className={classes.Visit__form_radioGroup}>
              <input
                type="radio"
                name="reachOut"
                id="yesReachOut"
                value={"Yes"}
              />
              <label htmlFor="yesReachOut">Yes</label>
              <input
                type="radio"
                name="reachOut"
                id="noReachOut"
                value={"No"}
              />
              <label htmlFor="noReachOut">No</label>
            </div>

            <br />
            <br />

            <button className={classes.Visit__form_button}>Submit</button>
          </form>
        </>
      );
      break;
  }
  return (
    <Layout globalData={globalData}>
      <div className={classes.Visit}>
        <div className="row">
          <div className="u-section-heading">
            <h1>Plan A Visit</h1>
          </div>
        </div>
        <div>
          <Sections sections={visitData.data.attributes.content} />
          <div className="u-line-width-limited">
            <h2>Let us know you&apos;re coming</h2>
            <p>
              Ready to check out Arcadia Community Church in person? We
              can&apos;t wait to meet you. Simply fill out the form below and
              we&apos;ll make sure to give you the{" "}
              <strong>VIP treatment</strong> upon your first visit.
            </p>
            <div>{requestForm}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Visit;
