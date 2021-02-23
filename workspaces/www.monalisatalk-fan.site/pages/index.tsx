import React, { useMemo } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import qs from 'qs';
import { LayoutContainer } from '~/components/LayoutContainer';
import { TopHeroView } from '~/components/TopHeroView';
import { SimpleVideoList } from '~/components/SimpleVideoList';
import { UILinkButton } from '~/components/UILinkButton';
import { Video } from '~/types';
import styles from './index.module.css';

export type StaticProps = {
  latestVideos: Video[];
  pickupVideos: string[][];
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const { videos } = await import('~/assets/data/resources.json');
  const latestVideos = videos.slice().splice(0, 4);
  const pickupVideos: string[][] = [];

  for (let i = 0; i < 3; i += 1) {
    const result: string[] = [];

    for (let j = 0; j < 10; j += 1) {
      const video = videos[Math.floor(Math.random() * videos.length)];

      if (!video) {
        j -= 1;

        continue;
      }

      const { id } = video;

      if (
        result.includes(id) ||
        pickupVideos.some((videoIdList) => videoIdList.includes(id))
      ) {
        j -= 1;

        continue;
      }

      result.push(id);
    }

    pickupVideos.push(result);
  }

  return {
    props: {
      latestVideos,
      pickupVideos,
    },
  };
};

export const IndexPage: React.VFC<StaticProps> = ({
  latestVideos,
  pickupVideos,
}) => {
  const pickupPlaylistLink = useMemo(
    () =>
      `/playlist?${qs.stringify(
        { v: pickupVideos.flatMap((videos) => videos) },
        { arrayFormat: 'repeat' }
      )}`,
    [pickupVideos]
  );

  return (
    <div className={styles.indexPage}>
      <TopHeroView videos={pickupVideos} />
      <LayoutContainer>
        <div className={styles.pageContainer}>
          <div className={styles.pickup}>
            <Link href={pickupPlaylistLink}>
              <a className={styles.link}>
                ＞ <span className={styles.text}>ピックアッププレイリスト</span>
              </a>
            </Link>
          </div>
          <section className={styles.section}>
            <h1 className={styles.heading}>
              <img
                className={styles.image}
                src="/images/top/headings/latest-videos.svg"
                alt="最新動画のタイトル"
              />
            </h1>
            <SimpleVideoList videos={latestVideos} />
            <div className={styles.morebutton}>
              <UILinkButton href="/videos">
                新着順にすべての動画をみる
              </UILinkButton>
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.heading}>
              <img
                className={styles.image}
                src="/images/top/headings/about.svg"
                alt="このウェブサイトについてのタイトル"
              />
            </h2>
            <p>lorem ipsum</p>
          </section>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default IndexPage;
