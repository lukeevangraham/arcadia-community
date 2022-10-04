import { useRouter } from "next/router";
import SEO from "../../components/SEO/SEO";
import { getAllEventsSlugs, getEventData, fetchAPI } from "../../lib/api";
import { keepEventsCurrent } from "../../lib/events";
import Image from "next/image";
import Layout from "../../components/Layout/Layout";
import DateBox from "../../components/Events/DateBox/DateBox";

import classes from "./slug.module.scss";

export async function getStaticPaths() {
  const paths = await getAllEventsSlugs();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const [globalData, eventData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    getEventData(params.slug),
  ]);

  return {
    props: {
      eventData,
      globalData,
    },
    revalidate: 1,
  };
}

export default function Event({ eventData, globalData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  keepEventsCurrent([eventData]);

  return (
    <>
      <SEO
        metaData={{
          metaTitle: eventData.attributes.title,
          metaDescription: eventData.attributes.description
            .replace(/<br>/g, " ")
            .replace(/<[^>]+>/g, "")
            .split(" ")
            .splice(0, 23)
            .join(" "),
          shareImage: eventData.attributes.image,
        }}
      />
      <Layout globalData={globalData}>
        <div className="u-section-heading">
          <div className="row">
            <h1>Upcoming Event</h1>
            <h4>
              &quot;Let us consider one another in order to stir up love and
              good works&quot; Hebrews 10:24
            </h4>
          </div>
        </div>
        <div className={`row ${classes.Event}`}>
          <div className={classes.Event__image}>
            <Image
              src={eventData.attributes.image.data.attributes.url}
              alt={eventData.attributes.image.data.attributes.alternativeText}
              layout="fill"
            />
          </div>
          <h1>{eventData.attributes.title}</h1>
          <div className={classes.Event__WhenAndWhere}>
            <div className={classes.Event__WhenAndWhere__Date}>
              <DateBox event={eventData} />
            </div>
            <div>
              <div className={classes.Event__WhenAndWhere__time}>
                <svg>
                  <use xlinkHref="../images/sprite.svg#icon-clock"></use>
                </svg>
                <div>
                  {new Date(
                    eventData.attributes.startDate
                  ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className={classes.Event__WhenAndWhere__place}>
                <svg>
                  <use xlinkHref="../images/sprite.svg#icon-location-pin"></use>
                </svg>
                <div>{eventData.attributes.location}</div>
              </div>
            </div>
          </div>
          <div className={`${classes.Event__body} u-margin-bottom-medium`}>
            <div
              dangerouslySetInnerHTML={{
                __html: eventData.attributes.description,
              }}
            />
          </div>
          <div
            className={classes.Event__bottomEmbed}
            dangerouslySetInnerHTML={{
              __html: eventData.attributes.bottomEmbed,
            }}
          ></div>
        </div>
      </Layout>
    </>
  );
}
