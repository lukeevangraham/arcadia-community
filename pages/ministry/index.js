import { fetchAPI } from "../../lib/api";
import DefaultBgImage from "../../components/UI/DefaultBgImage/DefaultBgImage";
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
        <h1>Our Ministries</h1>
        <h4>&quot;Through love serve one another&quot; Galatians 5:13</h4>
      </div>
      <div className="row">
        <div className={classes.Ministries__Menu}>
          {ministriesData.data.map((ministry) => (
            <div key={ministry.id}>
              <Link href={`/ministry/${ministry.attributes.Slug}`}>
                <a>
                  <div className={classes.Ministries__Menu_Ministry}>
                    <div className={classes.Ministries__Menu_Ministry_Image}>
                      {console.log("MD: ", ministry)}
                      {ministry.attributes.primaryPhoto.data ? (
                        <Image
                          src={
                            ministry.attributes.primaryPhoto.data.attributes.url
                          }
                          alt={
                            ministry.attributes.primaryPhoto.data.attributes
                              .alternateText
                          }
                          layout="fill"
                          objectFit="cover"
                        />
                      ) : (
                        <DefaultBgImage globalData={globalData} />
                      )}
                    </div>
                    <div
                      className={classes.Ministries__Menu_Ministry_Color}
                    ></div>
                    <h3 className={classes.Ministries__Menu_Ministry_Name}>
                      {ministry.attributes.ministryName}
                    </h3>
                  </div>
                </a>
              </Link>
              {/* <Link href={`/ministry/${ministry.attributes.Slug}`}>
                <div className={classes.Ministries__Menu_Ministry}>
                  <a>{ministry.attributes.ministryName}</a>
                </div>
              </Link> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Ministries;
