import Layout from "../../components/Layout/Layout";
import { fetchAPI } from "../../lib/api";

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
  <Layout globalData={globalData}>
    <section className={classes.Ministries}>
      <div className="u-section-heading">
        <h1>Our Ministries</h1>
        <h4>"Through love serve one another" Galatians 5:13</h4>
      </div>
      <div className="row">
        {ministriesData.data.map((ministry) => (
          <div key={ministry.id}>{ministry.attributes.ministryName}</div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Ministries;
