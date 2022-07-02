import Layout from "../../components/Layout/Layout";
import { fetchAPI } from "../../lib/api";

export async function getStaticProps() {
  const [globalData] = await Promise.all([fetchAPI("/global?populate=deep")]);
  return {
    props: { globalData },
    revalidate: 1,
  };
}

const News = ({ globalData }) => (
  <Layout globalData={globalData}>
    <div>News</div>
  </Layout>
);

export default News;
