import SEO from "../../components/SEO/SEO";
import Layout from "../../components/Layout/Layout";
import EventCard from "../../components/Events/EventCard/EventCard";
import { fetchAPI, getSortedEventsData } from "../../lib/api";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, eventsData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    getSortedEventsData(),
  ]);
  return {
    props: { globalData, eventsData },
    revalidate: 1,
  };
}

export default function Events({ globalData, eventsData }) {
  return (
    <>
      <SEO
        metaData={{
          metaTitle: "Events",
          metaDescription:
            "Events held and scheduled by Journey Community Church in Arcadia, California",
        }}
      />

      <Layout globalData={globalData}>
        <div className={classes.Events}>
          <div className="u-section-heading">
            <div className="row">
              <h1>Upcoming Events</h1>
              <h4>
                &quot;Let us consider one another in order to stir up love and
                good works&quot; Hebrews 10:24
              </h4>
            </div>
          </div>
          <div className={classes.Events__cards}>
            {eventsData ? (
              eventsData.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p style={{ textAlign: "center" }}>
                No events are currently listed. Check back soon.
              </p>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
