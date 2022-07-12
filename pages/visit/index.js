import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/UI/Button/Button";
import { fetchAPI } from "../../lib/api";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData] = await Promise.all([fetchAPI("/global?populate=deep")]);
  return {
    props: { globalData },
    revalidate: 1,
  };
}

const Visit = ({ globalData }) => {
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
          <div className={classes.Visit__topText}>

          </div>
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

          <div>
            <h2>
              <em>Getting to know each other</em>
            </h2>
            <p>
              “We know meeting someone for the first time can be intimidating,
              and going to a new church for the first time can be nerve-racking.
              We want to help make your first experience at Arcadia Community
              Church a great one.
            </p>
            <p>
              <br />
            </p>
            <h3>SERVICE TIME</h3>
            <p>
              <strong>Sundays</strong>&nbsp;at&nbsp;<strong>10:30am</strong>
            </p>
            <h3>
              <br />
            </h3>
            <h3>LOCATION &amp; DIRECTIONS</h3>
            <p>121 Alice Street</p>
            <p>Arcadia, CA 91006-3926</p>
            <h3>
              <br />
            </h3>
            <h3>PARKING</h3>
            <p>
              There are parking lots on the north and south side of the church.
              Street parking is also permitted. Handicapped parking is found in
              the north parking lot (on Genoa St.)
            </p>
            <h2>
              <br />
            </h2>
            <h2>
              <em>What can I expect?</em>
            </h2>
            <h3>HOW LONG IS AN ARCADIA COMMUNITY CHURCH SERVICE?</h3>
            <p>
              In total, an Arcadia Community Church service is about{" "}
              <strong>60 minutes in length</strong>. Services begin with the
              Arcadia Community Church band leading the church in music - song
              lyrics are projected onto the screens so you can sing along and/or
              engage with worship however you feel most comfortable. After the
              music portion of service is complete, one of our pastors will come
              out to share an encouraging and hope-filled message about Jesus.
            </p>
            <h3>
              <br />
            </h3>
            <h3>WHAT&apos;S THE CULTURE LIKE AT ARCADIA COMMUNITY CHURCH?</h3>
            <p>
              Sunday’s at Arcadia Community Church are <strong>exciting</strong>
              , <strong>casual</strong>, and <strong>relaxed</strong>. Come as
              you are and expect to feel welcomed as our guest.
            </p>
            <h3>
              <br />
            </h3>
            <h3>WHAT ABOUT MY KIDS?</h3>
            <p>
              We believe that kids should have a blast at church every single
              week - and at Arcadia Kids, we make this a priority. The other
              thing we make a priority is{" "}
              <strong>your children’s safety</strong>. Because of that, we have
              a detailed check-in process for our Arcadia Kids program the first
              time that you visit. You’ll want to leave yourself an extra ten
              minutes to get signed in for the Arcadia Kids experience. Arcadia
              Kids is offered for kids{" "}
              <strong>ages infant through Grade 8</strong>.
            </p>
          </div>

          <div>
            <h2><br /></h2>
            <h2>Let us know you&apos;re coming</h2>
            <p>
              Ready to check out Arcadia Community Church in person? We can&apos;t wait to
              meet you. Simply fill out the form below and we&apos;ll make sure
              to give you the <strong>VIP treatment</strong> upon your first
              visit.
            </p>
          </div>

          <div>{requestForm}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Visit;
