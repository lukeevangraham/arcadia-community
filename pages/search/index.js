import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ArticleCard from "../../components/Articles/ArticleCard/ArticleCard";
import EventCard from "../../components/Events/EventCard/EventCard";
import MinistryCard from "../../components/Ministries/MinistryCard";
import { fetchAPI } from "../../lib/api";
import { search } from "../../lib/search";

import Layout from "../../components/Layout/Layout";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData] = await Promise.all([fetchAPI("/global?populate=deep")]);
  return {
    props: { globalData },
    revalidate: 1,
  };
}

const Search = ({ globalData }) => {
  const router = useRouter();
  let [results, setResults] = useState("");

  const getRes = async (router) => {
    const response = await search(router.query.keyword);
    setResults(response);
  };

  useEffect(() => {
    if (!router.isReady) return;
    getRes(router);
  }, [router.isReady, router.query, router]);

  const eventLength = results.eventData ? results.eventData.data.length : null;
  const articleLength = results.articleData
    ? results.articleData.data.length
    : null;
  const ministryLength = results.ministryData
    ? results.ministryData.data.length
    : null;

  return (
    <Layout globalData={globalData} search>
      <div className="row">
        <h2 style={{ marginTop: "2rem" }}>Search: {router.query.keyword} </h2>
        <div className={classes.Search}>
          {eventLength == 0 && articleLength == 0 && ministryLength == 0 ? (
            <h3>No results found</h3>
          ) : results.ministryData ? (
            results.ministryData.data.map((ministry) => (
              <MinistryCard
                key={ministry.id}
                globalData={globalData}
                ministry={ministry}
              />
            ))
          ) : null}
          {results.articleData
            ? results.articleData.data.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  globalData={globalData}
                />
              ))
            : null}
          {results.eventData
            ? results.eventData.data.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            : null}
          {/* <div className={classes.Search__Articles}>
            <h3>News Articles</h3>
            <div className={classes.Search__Articles_wrapper}>
              {results.articleData ? (
                results.articleData.data.length > 0 ? (
                  results.articleData.data.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      globalData={globalData}
                    />
                  ))
                ) : (
                  <h4>No news articles found</h4>
                )
              ) : null}
            </div>
          </div>
          <div className={classes.Search__Events}>
            <h3>Events</h3>
            <div className={classes.Search__Events_wrapper}>
              {results.eventData ? (
                results.eventData.data.length > 0 ? (
                  results.eventData.data.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <h4>No events found</h4>
                )
              ) : null}
            </div>
          </div>
          <div className={classes.Search__Ministries}>
            <h3>Ministries</h3>
            <div className={classes.Search__Ministries_wrapper}>
              {results.ministryData ? (
                results.ministryData.data.length > 0 ? (
                  results.ministryData.data.map((ministry) => (
                    <MinistryCard
                      key={ministry.id}
                      globalData={globalData}
                      ministry={ministry}
                    />
                  ))
                ) : (
                  <h4>No ministries found</h4>
                )
              ) : null}
            </div>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
