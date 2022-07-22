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
  const [globalData, searchResponse] = await Promise.all([
    fetchAPI("/global?populate=deep"),
  ]);
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
  }, [router.isReady, router.query]);

  return (
    <Layout globalData={globalData}>
      <div className="row">
        {console.log("HERE: ", results)}
        <div>Search: {router.query.keyword} </div>
        <div className={classes.Search}>
          <div className={classes.Search__Articles}>
            <div>News Articles</div>
            <div className={classes.Search__Articles_wrapper}>
              {results.articleData
                ? results.articleData.data.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      globalData={globalData}
                    />
                  ))
                : null}
            </div>
          </div>
          <div className={classes.Search__Events}>
            <div>Events</div>
            <div className={classes.Search__Events_wrapper}>
              {results.eventData
                ? results.eventData.data.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))
                : null}
            </div>
          </div>
          <div className={classes.Search__Ministries}>
            <div>Ministries</div>
            <div className={classes.Search__Ministries_wrapper}>
              {results.ministryData
                ? results.ministryData.data.map((ministry) => (
                    <MinistryCard
                      key={ministry.id}
                      globalData={globalData}
                      ministry={ministry}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
