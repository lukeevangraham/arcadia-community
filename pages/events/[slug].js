import { getAllEventsSlugs, getEventData, fetchAPI } from "../../lib/api";
import Image from "next/image";
import Layout from "../../components/Layout/Layout";

import classes from "./slug.module.scss";

export async function getStaticPaths() {
  const paths = await getAllEventsSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [globalData, eventData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    getEventData(params.slug),
  ]);

  console.log("EDATA: ", eventData);

  return {
    props: {
      eventData,
      globalData,
    },
    revalidate: 1,
  };
}

export default function Event({ eventData, globalData }) {
  return (
    <Layout globalData={globalData}>
      <div className="u-section-heading">
        <h1>Upcoming Event</h1>
        <h4>
        &quot;Let us consider one another in order to stir up love and good works&quot;
          Hebrews 10:24
        </h4>
      </div>
      <div className={`row ${classes.Event}`}>
        {console.log("EDATA: ", eventData)}
        <div className={classes.Event__image}>
          <Image
            src={eventData.attributes.image.data.attributes.url}
            alt={eventData.attributes.image.data.attributes.alternativeText}
            layout="fill"
          />
        </div>
        <h1>{eventData.attributes.title}</h1>
        <div>{eventData.attributes.location}</div>
        <div className={classes.Event__body}>
          <div
            dangerouslySetInnerHTML={{
              __html: eventData.attributes.description,
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
