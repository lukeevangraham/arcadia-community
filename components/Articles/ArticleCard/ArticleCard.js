import Image from "next/image";
import Link from "next/link";

import DefaultBgImage from "../../UI/DefaultBgImage/DefaultBgImage";

import classes from "./ArticleCard.module.scss";

const dateOptions = { month: "short", day: "numeric", year: "numeric" };

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
    <div className={classes.Article__NotImage}>
      <Link href={`/news/${article.attributes.slug}`}>
        <a>
          <div className={classes.Article__NotImage_title}>
            {article.attributes.title}
          </div>
        </a>
      </Link>
      <div className={classes.Article__NotImage_belowTitle}>
        <div>
          <svg>
            <use xlinkHref="/images/sprite.svg#icon-user"></use>
          </svg>
          <div>{article.attributes.author}</div>
        </div>
        <div>
          <svg>
            <use xlinkHref="/images/sprite.svg#icon-calendar"></use>
          </svg>
          <div>
            {new Date(article.attributes.dateline).toLocaleDateString(
              "en-US",
              dateOptions
            )}
          </div>
        </div>
      </div>
      <div className={classes.Article__NotImage_excerpt}>
        {article.attributes.body
          .replace(/<br>/g, " ")
          .replace(/<[^>]+>/g, "")
          .split(" ")
          .splice(0, 16)
          .join(" ")}
        ...
      </div>
    </div>
  </div>
);

export default ArticleCard;
