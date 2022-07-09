import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import EventCard from "../components/Events/EventCard/EventCard";
import ArticleCard from "../components/Articles/ArticleCard/ArticleCard";
import Sections from "../components/Sections/Sections";
import { fetchAPI } from "../lib/api";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [homeData, globalData] = await Promise.all([
    fetchAPI("/home?populate=deep"),
    fetchAPI("/global?populate=deep"),
  ]);
  return {
    props: { homeData, globalData },
    revalidate: 1,
  };
}

export default function Home({ homeData, globalData }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
            <p className="u-margin-bottom-medium">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, ad
              dicta! Nisi, aspernatur hic ipsum magnam ullam quaerat facilis
              sequi quod, illum quia nostrum ipsam quos numquam vero magni
              quisquam.
            </p>
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

          <Sections sections={homeData.data.attributes.contentSections} />

          <section className="row">
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
