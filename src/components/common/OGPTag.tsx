import Helmet from "react-helmet";

import { metadata } from "@/config/site-metadata";

export type OGPTagProps = {
  isRoot?: boolean;
  title?: string;
  description?: string;
  image_url?: string;
};

export default function OGPTag({
  isRoot,
  title,
  description,
  image_url,
}: OGPTagProps) {
  const type = isRoot ? "website" : "article";

  return (
    <Helmet>
      <meta property="og:title" content={title || metadata.siteTitle} />
      <meta
        property="og:description"
        content={description || metadata.siteDescription}
      />

      <meta property="og:url" content={metadata.siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={metadata.siteTitle} />
      <meta property="og:image" content={image_url || metadata.siteImageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:site"
        content={`@${metadata.siteAuthorTwitterUserName}`}
      />
    </Helmet>
  );
}
