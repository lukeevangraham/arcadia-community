import { fetchAPI, getAllNewsSlugs, getNewsData } from "../../lib/api";
import Layout from "../../components/Layout/Layout";

import classes from "./slug.module.scss";

export async function getStaticPaths() {
  const paths = await getAllNewsSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [globalData, newsData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    getNewsData(params.slug),
  ]);

  return {
    props: {
      globalData,
      newsData,
    },
    revalidate: 1,
  };
}

export default function Article({ newsData, globalData }) {
  return (
    <Layout globalData={globalData}>
      <div className="u-section-heading">
        <h1>News Article</h1>
        <h4>Sharing Insights</h4>
      </div>
      {console.log("nd: ", newsData)}
      <div className="row">
        <div className={classes.Article}>
          <div>{newsData.attributes.title}</div>
          <div>{newsData.attributes.dateline}</div>
          <div>{newsData.attributes.author}</div>
          <div
            dangerouslySetInnerHTML={{ __html: newsData.attributes.body }}
          ></div>
        </div>
      </div>
    </Layout>
  );
}
