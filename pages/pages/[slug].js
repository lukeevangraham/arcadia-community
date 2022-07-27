import SEO from "../../components/SEO/SEO";
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
    <>
      <SEO
        metaData={
          pageData.attributes.metadata &&
          pageData.attributes.metadata.metaTitle &&
          pageData.attributes.metadata.metaDescription &&
          pageData.attributes.metadata.shareImage
            ? {
                metaTitle: pageData.attributes.metadata.metaTitle,
                metaDescription: pageData.attributes.metadata.metaDescription,
                shareImage: pageData.attributes.metadata.shareImage,
              }
            : pageData.attributes.metadata &&
              pageData.attributes.metadata.metaTitle &&
              pageData.attributes.metadata.metaDescription
            ? {
                metaTitle: pageData.attributes.metadata.metaTitle,
                metaDescription: pageData.attributes.metadata.metaDescription,
              }
            : pageData.attributes.metadata &&
              pageData.attributes.metadata.metaTitle
            ? {
                metaTitle: pageData.attributes.metadata.metaTitle,
              }
            : {
                metaTitle: pageData.attributes.shortName,
              }
        }
      />
      <Layout globalData={globalData}>
        <>
          <div className="row">
            <div className="u-section-heading">
              <h1>{pageData.attributes.shortName}</h1>
            </div>
          </div>
          {renderSections}
        </>
      </Layout>
    </>
  );
};

export default Page;
