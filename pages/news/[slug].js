import { fetchAPI, getAllNewsSlugs, getNewsData } from "../../lib/api";
import Image from "next/image";
import Layout from "../../components/Layout/Layout";
import DefaultBgImage from "../../components/UI/DefaultBgImage/DefaultBgImage";

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
          <div className={classes.Article__image}>
            {newsData.attributes.image.data ? (
              <Image
                src={newsData.attributes.image.data.attributes.url}
                alt={newsData.attributes.image.data.attributes.alternativeText}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <DefaultBgImage globalData={globalData} />
            )}
          </div>
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
