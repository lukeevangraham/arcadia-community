import SEO from "../../components/SEO/SEO";
import { fetchAPI } from "../../lib/api";
import MinistryCard from "../../components/Ministries/MinistryCard";
import Layout from "../../components/Layout/Layout";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, ministriesData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    fetchAPI("/ministries?populate=deep"),
  ]);
  return {
    props: { globalData, ministriesData },
    revalidate: 1,
  };
}

const Ministries = ({ globalData, ministriesData }) => (
  <>
    <SEO
      metaData={{
        metaTitle: `Ministries`,
        metaDescription: `Listing of church ministries for learning, growing, and serving. Contains details including ministry events, and leader info.`,
      }}
    />
    <Layout globalData={globalData}>
      <section className={classes.Ministries}>
        <div className="u-section-heading">
          <div className="row">
            <h1>Our Ministries</h1>
            <h4>&quot;Through love serve one another&quot; Galatians 5:13</h4>
          </div>
        </div>
        <div className="row">
          <div className={classes.Ministries__Menu}>
            {ministriesData.data.map((ministry) => (
              <MinistryCard
                key={ministry.id}
                globalData={globalData}
                ministry={ministry}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  </>
);

export default Ministries;
