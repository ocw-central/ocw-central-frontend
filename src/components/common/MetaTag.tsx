import Helmet from "react-helmet";

import { metadata } from "@/config/site-metadata";

export type Props = {
  isRoot?: boolean;
  title?: string;
  description?: string;
  image_url?: string;
};

export default function MetaTag({
  isRoot,
  title,
  description,
  image_url,
}: Props) {
  const type = isRoot ? "website" : "article";

  return (
    <Helmet>
      <meta property="title" content={title || metadata.siteTitle} />
      <meta
        property="description"
        content={description || metadata.siteDescription}
      />

      <meta property="url" content={metadata.siteUrl} />
      <meta property="type" content={type} />
      <meta property="site_name" content={metadata.siteTitle} />
      <meta property="image" content={image_url || metadata.siteImageUrl} />
    </Helmet>
  );
}
