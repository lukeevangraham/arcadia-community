import SEO from "../../components/SEO/SEO";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/UI/Button/Button";
import { fetchAPI } from "../../lib/api";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, prayerData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    fetchAPI("prayer?populate=deep"),
  ]);
  return {
    props: { globalData, prayerData },
    revalidate: 1,
  };
}

const Prayer = ({ globalData, prayerData }) => {
  let [messageStatus, setMessageStatus] = useState();

  const sendMessage = async (e) => {
    e.preventDefault();

    setMessageStatus(1);

    const res = await fetch("/api/request", {
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        request: e.target.request.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    result.status == 200 ? setMessageStatus(200) : null;
  };

  let requestForm = "";

  switch (messageStatus) {
    case 0:
      break;
    case 200:
      requestForm = (
        <div className={classes.Prayer__success}>
          <h3>Your request was successfully delivered</h3>
        </div>
      );
      break;
    case 1:
      requestForm = <div className={classes.Prayer__success}>Sending...</div>;
      break;
    default:
      requestForm = (
        <>
          <div className={classes.Prayer__topText}>
            <p>
              At Arcadia Community Church, we believe prayer makes a difference.
              How can we pray for you this week? Let us know using the form
              below.
            </p>
            <p>
              <i>
                NOTE: Any prayer request you share with Arcadia Community Church
                will remain confidential and only will be shared with our lead
                team for the purposes of prayer.
              </i>
            </p>
          </div>
          <form onSubmit={sendMessage} className={classes.Prayer__form}>
            <input type="text" name="name" placeholder="Your name" required />

            <input type="email" name="email" placeholder="Your email" />

            <textarea
              type="text"
              name="request"
              placeholder="Your prayer request"
              rows={10}
              required
            />

            <button className={classes.Prayer__form_button}>Submit</button>
          </form>
        </>
      );
      break;
  }
  return (
    <>
      <SEO
        metaData={{
          metaTitle: "Prayer",
          metaDescription: "Share a prayer request with our prayer team",
        }}
      />
      <Layout globalData={globalData}>
        <div className={classes.Prayer}>
          <div className="row">
            <div className="u-section-heading">
              <h1>Prayer Request</h1>
              <h4>Prayer changes everything</h4>
            </div>

            <div dangerouslySetInnerHTML={{ __html: prayerData.topText }}></div>

            <div>{requestForm}</div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Prayer;
