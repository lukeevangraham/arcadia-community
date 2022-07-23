import { getAllPageSlugs, getPageData, fetchAPI } from "../../lib/api";
import Layout from "../../components/Layout/Layout";
import Sections from "../../components/Sections/Sections";
import { render } from "react-dom";

export async function getStaticPaths() {
  const paths = await getAllPageSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [globalData, pageData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    getPageData(params.slug),
  ]);
  console.log("PD: ", pageData);
  return {
    props: {
      globalData,
      pageData,
    },
    revalidate: 1,
  };
}

const Page = ({ pageData, globalData }) => {
  let renderSections = pageData.attributes.contentSections ? (
    <Sections sections={pageData.attributes.contentSections} />
  ) : (
    <div>Loading...</div>
  );

  return (
    <Layout globalData={globalData}>
      <>
        <div className="row">
          {console.log("PD: ", pageData)}
          <div className="u-section-heading">
            <h1>{pageData.attributes.shortName}</h1>
          </div>
        </div>
        {renderSections}
      </>
    </Layout>
  );
};

export default Page;
