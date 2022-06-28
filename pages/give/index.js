import Layout from "../../components/Layout/Layout";
import { fetchAPI } from "../../lib/api";

export async function getStaticProps() {
  const [globalData] = await Promise.all([fetchAPI("/global?populate=deep")]);
  return {
    props: { globalData },
    revalidate: 1,
  };
}

const Give = ({ globalData }) => <Layout globalData={globalData}>Give Page</Layout>;

export default Give;
