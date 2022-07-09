import {
  fetchAPI,
  getAllMinistriesSlugs,
  getMinistryData,
} from "../../lib/api";
import { keepEventsCurrent, compareAndSortDates } from "../../lib/events";
import EventCard from "../../components/Events/EventCard/EventCard";
import ArticleCard from "../../components/Articles/ArticleCard/ArticleCard";
import Layout from "../../components/Layout/Layout";
import Image from "next/image";
import classes from "./slug.module.scss";

export async function getStaticPaths() {
  const paths = await getAllMinistriesSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [globalData, ministryData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    getMinistryData(params.slug),
  ]);
  return {
    props: {
      ministryData,
      globalData,
    },
    revalidate: 1,
  };
}

export default function Ministry({ ministryData, globalData }) {
  // GETTING RID OF EVENTS THAT HAPPENED AND DON'T REPEAT
  const oldEventsRemoved = ministryData.attributes.events.data.filter(
    (event) => event.attributes.endDate >= new Date().toISOString()
  );

  // BRINGING REPEATING EVENTS UP TO CURRENT ITERATION
  const recurringEventsMadeCurrent = keepEventsCurrent(oldEventsRemoved);

  // SORTING THE DATES LEFT
  const sortedDates = recurringEventsMadeCurrent.sort(compareAndSortDates);

  return (
    <Layout globalData={globalData}>
      {console.log("MD: ", ministryData)}
      <div className={classes.Ministry}>
        <div className="row">
          <div className="u-section-heading">
            <h1>
              {ministryData.attributes.ministryName} in Arcadia Community Church
            </h1>
            <h4>&quot;Through love serve one another&quot; Galatians 5:13</h4>
          </div>
        </div>
        <div className="row">
          <div
            className={`${classes.Ministry__TopInfo} u-margin-bottom-medium`}
          >
            <div
              className={classes.Ministry__TopInfo_Description}
              dangerouslySetInnerHTML={{
                __html: ministryData.attributes.description,
              }}
            ></div>
            <div className={classes.Ministry__TopInfo_LeaderPhoto}>
              <Image
                src={ministryData.attributes.leaderPhoto.data.attributes.url}
                alt={
                  ministryData.attributes.leaderPhoto.data.attributes
                    .alternativeText
                }
                layout="fill"
                objectFit="contain"
              ></Image>
            </div>
          </div>

          <div className="u-section-heading">
            <h2>{ministryData.attributes.ministryName} Events</h2>
            <h4>&quot;Through love serve one another&quot; Galatians 5:13</h4>
          </div>

          <div className={`${classes.Ministry__Events} u-margin-bottom-medium`}>
            {sortedDates.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="u-section-heading">
            <h2>{ministryData.attributes.ministryName} News</h2>
            <h4>&quot;Through love serve one another&quot; Galatians 5:13</h4>
          </div>
          <div className={classes.Ministry__Articles}>
            {ministryData.attributes.articles.data.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
