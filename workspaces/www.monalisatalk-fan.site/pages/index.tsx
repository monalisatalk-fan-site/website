import React, { useMemo } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import clsx from 'clsx';
import qs from 'qs';
import { HeadMeta } from '~/components/HeadMeta';
import { LayoutContainer } from '~/components/LayoutContainer';
import { TopHeroView } from '~/components/TopHeroView';
import { SimpleVideoList } from '~/components/SimpleVideoList';
import { UILinkButton } from '~/components/UILinkButton';
import { LineStickers } from '~/components/LineStickers';
import { Video } from '~/types';
import type stickers from '~/assets/data/stickers.json';
import styles from './index.module.css';

export type StaticProps = {
  latestVideos: Video[];
  recommendedVideos: Video[];
  pickupVideos: string[][];
  stickers: typeof stickers;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const { author, stickers } = await import('~/assets/data/stickers.json');
  const { videos, recommendedVideos } = await import(
    '~/assets/data/resources.json'
  );
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
      recommendedVideos: recommendedVideos.slice().splice(0, 4),
      pickupVideos,
      stickers: { author, stickers },
    },
  };
};

export const IndexPage: React.VFC<StaticProps> = ({
  latestVideos,
  recommendedVideos,
  pickupVideos,
  stickers,
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
    <>
      <HeadMeta
        title="モナ・リザの戯言 非公式ファンサイト"
        withoutTitleTemplate
        pathname="/"
      />
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
            <h1 id="latest" className={styles.heading}>
              <img
                className={styles.image}
                src="/images/top/headings/latest-videos.svg"
                alt="最新漫画動画のタイトル"
              />
            </h1>
            <SimpleVideoList videos={latestVideos} />
            <div className={styles.morebutton}>
              <UILinkButton href="/videos">もっとみる</UILinkButton>
            </div>
          </section>
          <section className={styles.section}>
            <h1 id="recommended" className={clsx(styles.heading, styles.Left)}>
              <img
                className={styles.image}
                src="/images/top/headings/recommended-videos.svg"
                alt="モナ・リザの戯言チャンネルおすすめ漫画動画のタイトル"
              />
            </h1>
            <SimpleVideoList videos={recommendedVideos} />
            <div className={styles.morebutton}>
              <UILinkButton href="/playlist/recommended">
                もっとみる
              </UILinkButton>
            </div>
          </section>
          <section className={styles.section}>
            <h1 id="goods" className={clsx(styles.heading, styles.Right)}>
              <img
                className={styles.image}
                src="/images/top/headings/line-sticker.svg"
                alt="モナ・リザの戯言のLINEスタンプ"
              />
            </h1>
            <LineStickers stickers={stickers} />
          </section>
          <section className={styles.section}>
            <h1 id="about" className={styles.heading}>
              <img
                className={styles.image}
                src="/images/top/headings/about.svg"
                alt="このウェブサイトについてのタイトル"
              />
            </h1>
            <p>lorem ipsum</p>
          </section>
        </div>
      </LayoutContainer>
    </div>
    </>
  );
};

export default IndexPage;
