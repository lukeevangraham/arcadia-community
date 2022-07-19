import Image from "next/image";
import Link from "next/link";

import DefaultBgImage from "../../UI/DefaultBgImage/DefaultBgImage";

import classes from "./ArticleCard.module.scss";

const ArticleCard = ({ article, globalData }) => (
  <div className={classes.Article} key={article.id}>
    <Link href={`/news/${article.attributes.slug}`}>
      <a>
        <div className={classes.Article_image}>
          {article.attributes.image.data ? (
            <Image
              src={article.attributes.image.data.attributes.url}
              alt={article.attributes.image.data.attributes.alternativeText}
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <DefaultBgImage globalData={globalData} />
          )}
        </div>
      </a>
    </Link>
    <div className={classes.Article_title}>{article.attributes.title}</div>
    <div className={classes.Article_belowTitle}>
      <div>{article.attributes.author}</div>
      <div>{article.attributes.dateline}</div>
    </div>
    <div className={classes.Article_excerpt}>
      {article.attributes.body
        .replace(/<br>/g, " ")
        .replace(/<[^>]+>/g, "")
        .split(" ")
        .splice(0, 16)
        .join(" ")}{" "}
      ...
    </div>
  </div>
);

export default ArticleCard;
