// import { NextSeo } from "next-seo";
import SEO from "../components/SEO/SEO";
import Image from "next/image";
import Sermons from "../components/Sermons/Sermons";
import Layout from "../components/Layout/Layout";
import EventCard from "../components/Events/EventCard/EventCard";
import ArticleCard from "../components/Articles/ArticleCard/ArticleCard";
import Sections from "../components/Sections/Sections";
import Countdown from "../components/UI/Countdown/Countdown";
import { fetchAPI } from "../lib/api";
import { streamYouTubeOptions, sermonYouTubeOptions } from "../lib/youTube";
import { keepEventsCurrent, compareAndSortDates } from "../lib/events";

import Fade from "react-reveal/Fade";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [homeData, globalData, youTubeData, sermonData] = await Promise.all([
    fetchAPI("/home?populate=deep"),
    fetchAPI("/global?populate=deep"),
    streamYouTubeOptions("PLchW5rz4AxRI3q73zPOnHzdAYcO1k7Djh"),
    sermonYouTubeOptions("PLchW5rz4AxRIYM075lL7iNFXNiyvS46Kd"),
  ]);

  return {
    props: {
      homeData,
      globalData,
      youTubeData,
      sermonData: JSON.stringify(sermonData),
    },
    revalidate: 1,
  };
}

export default function Home({
  homeData,
  globalData,
  youTubeData,
  sermonData,
}) {
  const eventsKeptCurrent = keepEventsCurrent(
    homeData.data.attributes.events.data
  );
  eventsKeptCurrent.sort(compareAndSortDates);

  return (
    <>
      <SEO metaData={homeData.data.attributes.SEO[0]} />
      <Layout
        homeHeaderImage={homeData.data.attributes.headerImage.data.attributes}
        globalData={globalData}
      >
        <div className={classes.ServiceInfo}>
          <div className={classes.ServiceInfo__image}>
            <Image
              src={
                homeData.data.attributes.servicePromoImage.data.attributes.url
              }
              alt={
                homeData.data.attributes.servicePromoImage.data.attributes
                  .alternativeText
              }
              layout="fill"
              objectFit="cover"
              objectPosition={"bottom"}
            />
          </div>
          <div className={classes.ServiceInfo__text}>
            <h3>Sunday Service Time</h3>
            <div>
              Live at 10:30 am in our Sanctuary and YouTube. <br />
              Sunday school provided for Preschool - 5th grade.
            </div>
          </div>
          <Countdown event={null} />
        </div>
        <main className={classes.main}>
          <div className="row">
            <Fade bottom>
              <div className="u-section-heading">
                <h1>Welcome To Arcadia Community Church</h1>
                <h4>
                  &quot;Through love serve one another&quot; Galatians 5:13
                </h4>
              </div>
            </Fade>
            <div
              className={`${classes.main__underWelcome} u-margin-bottom-medium`}
            >
              <Fade left duration={1500}>
                <iframe
                  src={`https://www.youtube.com/embed/${youTubeData.snippet.resourceId.videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Fade>
              <Fade right duration={1500}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: homeData.data.attributes.TopText,
                  }}
                  className={classes.main__underWelcome__userText}
                ></div>
              </Fade>
            </div>
          </div>

          <section className="row u-margin-bottom-medium">
            <Fade bottom>
              <div className="u-section-heading">
                <h2>Featured Events</h2>
                <h4>
                  &quot;Through love serve one another&quot; Galatians 5:13
                </h4>
              </div>
            </Fade>

            <Fade bottom cascade duration={1500}>
              <div className={`${classes.main__Events}`}>
                {eventsKeptCurrent.map((event) => (
                  <EventCard event={event} key={event.id} />
                ))}
              </div>
            </Fade>
          </section>

          <Sections
            sections={homeData.data.attributes.contentSections.filter(
              (section, index) => index !== 0
            )}
            globalData={globalData}
          />

          <Sermons sermons={JSON.parse(sermonData)} />

          <Sections
            sections={homeData.data.attributes.contentSections.filter(
              (section, index) => index !== 1
            )}
            globalData={globalData}
          />

          <section className="row u-padding-top-medium">
            <Fade bottom>
              <div className="u-section-heading">
                <h2>Featured News</h2>
                <h4>
                  &quot;Through love serve one another&quot; Galatians 5:13
                </h4>
              </div>
            </Fade>

            <Fade bottom duration={1500} cascade>
              <div className={`${classes.main__Articles}`}>
                {homeData.data.attributes.articles.data.map((article) => (
                  <ArticleCard article={article} key={article.id} />
                ))}
              </div>
            </Fade>
          </section>
        </main>
      </Layout>
    </>
  );
}
