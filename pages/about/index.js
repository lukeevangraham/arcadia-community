import SEO from "../../components/SEO/SEO";
import Image from "next/image";
import StaffMember from "../../components/About/StaffMember/StaffMember";
import Layout from "../../components/Layout/Layout";
import Verse from "../../components/Sections/Verse/Verse";
import { fetchAPI } from "../../lib/api";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, staffData, aboutData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    fetchAPI("/staff-members?sort=displayOrder:asc&populate=deep"),
    fetchAPI("/about?populate=deep"),
  ]);
  return {
    props: { globalData, staffData, aboutData },
    revalidate: 1,
  };
}

const About = ({ globalData, staffData, aboutData }) => (
  <>
    <SEO metaData={aboutData.data.attributes.metadata} />
    <Layout globalData={globalData}>
      <div className={classes.About}>
        <section className="u-section-heading">
          <div className="row">
            <h1>About Us</h1>
            <h4>
              &quot;Let us consider one another in order to stir up love and
              good works&quot; Hebrews 10:24
            </h4>
          </div>
        </section>
        <section className="row">
          <div className={classes.About__top}>
            <div className={classes.About__top_photo}>
              <Image
                src={aboutData.data.attributes.topImage.data.attributes.url}
                alt={
                  aboutData.data.attributes.topImage.data.attributes
                    .alternativeText
                }
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={classes.About__top_text}>
              <div
                dangerouslySetInnerHTML={{
                  __html: aboutData.data.attributes.topText,
                }}
              ></div>
            </div>
          </div>
        </section>

        <section className={classes.About__serviceTime}>
          <div className={classes.About__serviceTime_photo}>
            <Image
              src={aboutData.data.attributes.serviceTimeBg.data.attributes.url}
              alt={
                aboutData.data.attributes.serviceTimeBg.data.attributes
                  .alternativeText
              }
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={classes.About__serviceTime_text}>
            <h2>Sunday Service Time</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: aboutData.data.attributes.serviceTimeText,
              }}
            ></div>
          </div>
        </section>

        {/* SHOWING PASTORS AND STAFF */}
        <section className="row">
          <div className="u-section-heading">
            <h2>Our Pastors</h2>
            <h4>
              &quot;Let us consider one another in order to stir up love and
              good works&quot; Hebrews 10:24
            </h4>
          </div>
          <div className={classes.About__people}>
            {staffData.data
              .filter((person) => person.attributes.jobTitle.includes("Pastor"))
              .map((person) => (
                <StaffMember person={person} key={person.id} />
              ))}
          </div>
        </section>
        <section className="row u-margin-bottom-medium">
          <div className="u-section-heading">
            <h2>Our Staff</h2>
            <h4>
              &quot;Let us consider one another in order to stir up love and
              good works&quot; Hebrews 10:24
            </h4>
          </div>
          <div
            className={`${classes.About__people} ${classes.About__people_staff}`}
          >
            {staffData.data
              .filter(
                (person) => !person.attributes.jobTitle.includes("Pastor")
              )
              .map((person) => (
                <StaffMember person={person} key={person.id} />
              ))}
          </div>
          <div className={classes.About__appointment}>
            As always, church business takes place both on and off-campus. And
            although we practice an open-door policy, if you desire to meet with
            a specific staff person, it would be advisable to make an
            appointment in advance.
          </div>
        </section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.577130767618!2d-118.02988554925243!3d34.13157402089753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2dbd083e890f7%3A0x4907c229645c3830!2sArcadia%20Community%20Church!5e0!3m2!1sen!2sus!4v1658296717908!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <section>
          <Verse
            data={aboutData.data.attributes.bottomVerse}
            globalData={globalData}
          />
        </section>
      </div>
    </Layout>
  </>
);

export default About;
