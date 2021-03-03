import React, { useMemo } from 'react';
import Head from 'next/head';
import urlJoin from 'url-join';

export type Props = {
  title: string;
  withoutTitleTemplate?: boolean;
  description?: string;
  pathname: string;
  image?: string;
  type?: string;
};

export const HeadMeta: React.VFC<Props> = ({ title, withoutTitleTemplate = false, description, pathname, image = '/images/common/ogp.jpg', type = 'website' }) => {
  const realTitle = useMemo((): string => withoutTitleTemplate ? title : `${title} - モナ・リザの戯言 非公式ファンサイト`, [title, withoutTitleTemplate]);
  const imageUrl = useMemo((): string => /^\/[^/]*/.test(image) ? urlJoin('https://www.monalisatalk-fan.site', image) : image, [image]);
  const pageUrl = useMemo((): string => urlJoin('https://www.monalisatalk-fan.site', pathname), [pathname]);

  return (
    <Head>
      <title>{realTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="モナ・リザの戯言 非公式ファンサイト" />
      { description && <meta property="og:description" content={description} /> }
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@monalisatalkfan" />
    </Head>
  );
};
