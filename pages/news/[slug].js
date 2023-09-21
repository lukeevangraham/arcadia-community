import { useRouter } from "next/router";
import SEO from "../../components/SEO/SEO";
import { fetchAPI, getAllNewsSlugs, getNewsData } from "../../lib/api";
import Image from "next/image";
import Layout from "../../components/Layout/Layout";
import DefaultBgImage from "../../components/UI/DefaultBgImage/DefaultBgImage";

import classes from "./slug.module.scss";

export async function getStaticPaths() {
  const paths = await getAllNewsSlugs();
  return {
    paths,
    fallback: true,
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

const dateOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
};

export default function Article({ newsData, globalData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SEO
        metaData={{
          metaTitle: newsData.attributes.title,
          metaDescription: newsData.attributes.body
            .replace(/<br>/g, " ")
            .replace(/<[^>]+>/g, "")
            .split(" ")
            .splice(0, 23)
            .join(" "),
          shareImage: newsData.attributes.image,
        }}
      />
      <Layout globalData={globalData}>
        <div className="u-section-heading">
          <div className="row">
            <h1>{newsData.attributes.title}</h1>
            <h4>News Article</h4>
          </div>
        </div>
        <div className="row">
          <div className={classes.Article}>
            <div className={classes.Article__image}>
              {newsData.attributes.image.data ? (
                <Image
                  src={newsData.attributes.image.data.attributes.url}
                  alt={
                    newsData.attributes.image.data.attributes.alternativeText
                  }
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <DefaultBgImage globalData={globalData} />
              )}
            </div>
          </div>
          <div className="u-line-width-limited">
            {/* <div className={classes.Article__title}>
            {newsData.attributes.title}
          </div> */}
            <div className={classes.Article__Info}>
              <div>
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-user"></use>
                </svg>
                <div>{newsData.attributes.author}</div>
              </div>
              <div>
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-calendar"></use>
                </svg>
                <div>
                  {new Date(newsData.attributes.dateline).toLocaleDateString(
                    "en-US",
                    dateOptions
                  )}
                </div>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: newsData.attributes.body }}
            ></div>
            {newsData.attributes.PDFtoEmbed &&
            newsData.attributes.PDFtoEmbed.data ? (
              // <embed
              //   src={`http://docs.google.com/gview?url=${newsData.attributes.PDFtoEmbed.data.attributes.url}`}
              //   type="application/pdf"
              //   width={"100%"}
              // />

              // <iframe
              //   src={`${newsData.attributes.PDFtoEmbed.data.attributes.url}`}
              //   frameborder="0"
              //   width={"100%"}
              //   height="500px"
              // ></iframe>

              // <iframe
              //   src={`http://docs.google.com/gview?url=${newsData.attributes.PDFtoEmbed.data.attributes.url}&embedded=true`}
              //   style={{ width: "600px", height: "500px" }}
              //   frameBorder="0"
              // ></iframe>

              //               <embed src={newsData.attributes.PDFtoEmbed.data.attributes.url} width="100%" height="500px"
              //  type="application/pdf"></embed>

              <object
                data={newsData.attributes.PDFtoEmbed.data.attributes.url}
                type="application/pdf"
                width="100%"
                height="800px"
              >
                <p>
                  It appears you don&apos;t have a PDF plugin for this browser.
                  No biggie... you can{" "}
                  <a href={newsData.attributes.PDFtoEmbed.data.attributes.url}>
                    click here to download the PDF file.
                  </a>
                </p>
              </object>
            ) : null}
          </div>
        </div>
      </Layout>
    </>
  );
}
