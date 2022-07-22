import { fetchAPI } from "../../lib/api";
import DefaultBgImage from "../../components/UI/DefaultBgImage/DefaultBgImage";
import MinistryCard from "../../components/Ministries/MinistryCard";
import Image from "next/image";
import Link from "next/link";
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
            <MinistryCard globalData={globalData} ministry={ministry} />
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Ministries;
