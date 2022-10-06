import SEO from "../../components/SEO/SEO";
import Layout from "../../components/Layout/Layout";
import ArticleCard from "../../components/Articles/ArticleCard/ArticleCard";
import Image from "next/image";
import Link from "next/link";
import { fetchAPI } from "../../lib/api";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, newsData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    fetchAPI("/articles?populate=deep&sort=dateline:desc"),
  ]);
  return {
    props: { globalData, newsData },
    revalidate: 1,
  };
}

const News = ({ globalData, newsData }) => (
  <>
    <SEO
      metaData={{
        metaTitle: `News`,
        metaDescription: `Articles about ministries, events and other items of interest`,
      }}
    />

    <Layout globalData={globalData}>
      <div className="row">
        <div className="u-section-heading">
          <h1>Latest News</h1>
          <h4>
            &quot;Let us consider one another in order to stir up love and good
            works&quot; Hebrews 10:24
          </h4>
        </div>
        <div className={classes.Articles}>
          {newsData.data.map((article) => (
            <ArticleCard
              article={article}
              key={article.id}
              globalData={globalData}
            />
          ))}
        </div>
      </div>
    </Layout>
  </>
);

export default News;
