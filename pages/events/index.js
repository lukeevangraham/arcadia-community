import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import EventCard from "../../components/Events/EventCard/EventCard";
import { fetchAPI } from "../../lib/api";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, eventsData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    fetchAPI("/events?populate=deep"),
  ]);
  return {
    props: { globalData, eventsData },
    revalidate: 1,
  };
}

export default function Events({ globalData, eventsData }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout globalData={globalData}>
        <main>
          <div className={classes.Events}>
            <div className={classes.Events__cards}>
              {eventsData.data.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
