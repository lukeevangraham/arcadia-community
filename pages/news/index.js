import Layout from "../../components/Layout/Layout";
import Image from "next/image";
import { fetchAPI } from "../../lib/api";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, newsData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    fetchAPI("/articles?populate=deep"),
  ]);
  return {
    props: { globalData, newsData },
    revalidate: 1,
  };
}

const News = ({ globalData, newsData }) => (
  <Layout globalData={globalData}>
    <div className="row">
      <div className={classes.Articles}>
        {newsData.data.map((article) => (
          <div className={classes.Articles__Article} key={article.id}>
            <div className={classes.Articles__Article_image}>
              <Image
                src={article.attributes.image.data.attributes.url}
                alt={article.attributes.image.data.attributes.alternativeText}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={classes.Articles__Article_title}>
              {article.attributes.title}
            </div>
            {console.log("ART: ", article)}
            <div className={classes.Articles__Article_belowTitle}>
              <div>{article.attributes.author}</div>
              <div>{article.attributes.dateline}</div>
            </div>
            <div className={classes.Articles__Article_excerpt}>
              {article.attributes.body
                .replace(/<br>/g, " ")
                .replace(/<[^>]+>/g, "").split(" ").splice(0, 16).join(" ")} ...
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default News;
