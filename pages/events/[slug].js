import { getAllEventsSlugs, getEventData, fetchAPI } from "../../lib/api";
import { keepEventsCurrent } from "../../lib/events";
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

  return {
    props: {
      eventData,
      globalData,
    },
    revalidate: 1,
  };
}

export default function Event({ eventData, globalData }) {
  keepEventsCurrent([eventData]);
  return (
    <Layout globalData={globalData}>
      <div className="u-section-heading">
        <div className="row">
          <h1>Upcoming Event</h1>
          <h4>
            &quot;Let us consider one another in order to stir up love and good
            works&quot; Hebrews 10:24
          </h4>
        </div>
      </div>
      <div className={`row ${classes.Event}`}>
        <div className={classes.Event__image}>
          <Image
            src={eventData.attributes.image.data.attributes.url}
            alt={eventData.attributes.image.data.attributes.alternativeText}
            layout="fill"
          />
        </div>
        <h1>{eventData.attributes.title}</h1>
        <div className={classes.Event__datebox}>
          <div>
            {new Date(eventData.attributes.startDate).toLocaleDateString()}
            <br />
          </div>
        </div>
        <div className={classes.Event__time}>
          <svg>
            <use xlinkHref="../images/sprite.svg#icon-clock"></use>
          </svg>
          <div>
            {new Date(eventData.attributes.startDate).toLocaleTimeString()}
          </div>
        </div>
        <div className={classes.Event__place}>
          <svg>
            <use xlinkHref="../images/sprite.svg#icon-location-pin"></use>
          </svg>
          <div>{eventData.attributes.location}</div>
        </div>
        <div className={`${classes.Event__body} u-margin-bottom-medium`}>
          <div
            dangerouslySetInnerHTML={{
              __html: eventData.attributes.description,
            }}
          />
        </div>
        <div
          className={classes.Event__bottomEmbed}
          dangerouslySetInnerHTML={{ __html: eventData.attributes.bottomEmbed }}
        ></div>
      </div>
    </Layout>
  );
}
