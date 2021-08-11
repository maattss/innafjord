import Head from "next/head";

type metaProps = {
  title: string;
  keywords: string;
  description: string;
};

const Meta = ({ title, keywords, description }: metaProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="favicons/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <title>{title} - Innafjord 2.0</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Innafjord 2.0",
  keywords: "Innafjord, turbines, water, hydropower",
  description: "Innafjord hydropower system",
};

export default Meta;
