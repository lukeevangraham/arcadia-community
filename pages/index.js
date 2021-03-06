// import { NextSeo } from "next-seo";
import SEO from "../components/SEO/SEO";
import Image from "next/image";
import Sermons from "../components/Sermons/Sermons";
import Layout from "../components/Layout/Layout";
import EventCard from "../components/Events/EventCard/EventCard";
import ArticleCard from "../components/Articles/ArticleCard/ArticleCard";
import Sections from "../components/Sections/Sections";
import { fetchAPI } from "../lib/api";
import { streamYouTubeOptions, sermonYouTubeOptions } from "../lib/youTube";

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
        </div>
        <main className={classes.main}>
          <div className="row">
            <div className="u-section-heading">
              <h1>Welcome To Arcadia Community Church</h1>
              <h4>&quot;Through love serve one another&quot; Galatians 5:13</h4>
            </div>
            <div
              className={`${classes.main__underWelcome} u-margin-bottom-medium`}
            >
              <iframe
                src={`https://www.youtube.com/embed/${youTubeData.snippet.resourceId.videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa,
                ad dicta! Nisi, aspernatur hic ipsum magnam ullam quaerat
                facilis sequi quod, illum quia nostrum ipsam quos numquam vero
                magni quisquam.
              </p>
            </div>
          </div>

          <section className="row u-margin-bottom-medium">
            <div className="u-section-heading">
              <h2>Featured Events</h2>
              <h4>&quot;Through love serve one another&quot; Galatians 5:13</h4>
            </div>

            <div className={`${classes.main__Events}`}>
              {homeData.data.attributes.events.data.map((event) => (
                <EventCard event={event} key={event.id} />
              ))}
            </div>
          </section>

          <Sermons sermons={JSON.parse(sermonData)} />

          <Sections
            sections={homeData.data.attributes.contentSections}
            globalData={globalData}
          />

          <section className="row u-padding-top-medium">
            <div className="u-section-heading">
              <h2>Featured News</h2>
              <h4>&quot;Through love serve one another&quot; Galatians 5:13</h4>
            </div>

            <div className={`${classes.main__Articles}`}>
              {homeData.data.attributes.articles.data.map((article) => (
                <ArticleCard article={article} key={article.id} />
              ))}
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
