import { useRouter } from "next/router";
import SEO from "../../components/SEO/SEO";
import { getAllJobSlugs, getJobData, fetchAPI } from "../../lib/api";
import Layout from "../../components/Layout/Layout";

export async function getStaticPaths() {
  const paths = await getAllJobSlugs();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const [globalData, jobData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    getJobData(params.slug),
  ]);

  return {
    props: {
      globalData,
      jobData,
    },
    revalidate: 1,
  };
}

const Job = ({ jobData, globalData }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
  <>
    <SEO
      metaData={{
        metaTitle: `${jobData.attributes.jobTitle}`,
        metaDescription: jobData.attributes.description
          .replace(/<br>/g, " ")
          .replace(/<[^>]+>/g, "")
          .split(" ")
          .splice(0, 23)
          .join(" "),
      }}
    />
    <Layout globalData={globalData}>
      <div className="u-section-heading">
        <div className="row">
          <h1>
            Job Opening:
            <br />
            {jobData.attributes.jobTitle}
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="u-line-width-limited">
          <div
            dangerouslySetInnerHTML={{ __html: jobData.attributes.description }}
          ></div>
        </div>
      </div>
    </Layout>
  </>
)};

export default Job;
