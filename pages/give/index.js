import SEO from "../../components/SEO/SEO";
import Layout from "../../components/Layout/Layout";
import Sections from "../../components/Sections/Sections";
import { fetchAPI } from "../../lib/api";

export async function getStaticProps() {
  const [globalData, givingData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    fetchAPI("/giving?populate=deep"),
  ]);
  return {
    props: { globalData, givingData },
    revalidate: 1,
  };
}

const Give = ({ globalData, givingData }) => (
  <>
    <SEO metaData={givingData.data.attributes.SEO} />
    <Layout globalData={globalData}>
      <div className="row">
        <div className="u-section-heading">
          <h1>Online Giving</h1>
          <h4>
            &quot;Let us consider one another in order to stir up love and good
            works&quot; Hebrews 10:24
          </h4>
        </div>
      </div>
      <Sections sections={givingData.data.attributes.contentSections} globalData={globalData} />
    </Layout>
  </>
);

export default Give;
