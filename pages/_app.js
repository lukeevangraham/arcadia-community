import { DefaultSeo } from "next-seo";
import Head from "next/head";
import Script from "next/script";
import "../styles/globals.scss";
import "@fontsource/nunito-sans/200.css";
import "@fontsource/nunito-sans/300.css";
import "@fontsource/nunito-sans/300-italic.css";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/600-italic.css";
import "@fontsource/nunito-sans/700.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        titleTemplate={`%s · Arcadia Community Church`}
        title={"Arcadia Community Church, Arcadia, California"}
        description={
          "Arcadia Community Church led by Rev. John M. Scholte is committed to sharing the gospel of Jesus Christ with Arcadia, Los Angeles and beyond."
        }
        openGraph={{
          type: "website",
          locale: "en_US",
          images: [
            {
              url: "https://res.cloudinary.com/daix3hjqf/image/upload/v1654292460/Arcadia_Community_Church_9ab0277d0b.jpg",
              width: 2000,
              height: 1333,
              alt: "Arcadia Community Church Building",
            },
            {
              url: "https://res.cloudinary.com/daix3hjqf/image/upload/v1654292461/thumbnail_Arcadia_Community_Church_9ab0277d0b.jpg",
              width: 234,
              height: 156,
              alt: "Arcadia Community Church Building",
            },
          ],
          site_name: "Arcadia Community Church",
        }}
        additionalLinkTags={[
          {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon.png",
            sizes: "180x180",
          },
          {
            rel: "icon",
            type: "image/png",
            href: "/favicon-32x32.png",
            sizes: "32x32",
          },
          {
            rel: "icon",
            type: "image/png",
            href: "/favicon-16x16.png",
            sizes: "16x16",
          },
          {
            rel: "manifest",
            href: "/site.webmanifest",
          },
        ]}
      />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-7TMD11EWJ8" />
      <Script>
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-7TMD11EWJ8');`}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
