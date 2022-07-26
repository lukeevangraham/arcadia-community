import { NextSeo } from "next-seo";

const SEO = ({ metaData }) => (
  <NextSeo
    title={metaData.metaTitle}
    description={metaData.metaDescription}
    openGraph={
      metaData && metaData.shareImage && metaData.shareImage.data
        ? {
            title: metaData.metaTitle,
            description: metaData.metaDescription,
            images: [
              {
                url: metaData.shareImage.data.attributes.url,
                width: metaData.shareImage.data.attributes.width,
                height: metaData.shareImage.data.attributes.height,
                alt: metaData.shareImage.data.attributes.alternativeText,
              },
              {
                url: metaData.shareImage.data.attributes.formats.thumbnail.url,
                width:
                  metaData.shareImage.data.attributes.formats.thumbnail.width,
                height:
                  metaData.shareImage.data.attributes.formats.thumbnail.height,
                alt: metaData.shareImage.data.attributes.formats.thumbnail
                  .alternativeText,
              },
            ],
          }
        : { title: metaData.metaTitle, description: metaData.metaDescription }
    }
  />
);

export default SEO;
