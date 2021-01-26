import * as admin from 'firebase-admin';
import { database } from '../helpers/database';
import { authorizedFunctionsHttps } from '../helpers/authorizedFunctionsHttps';
import { fetchChannelVideos } from '../helpers/fetchChannelVideos';

export const captureVideosOnTheChannel = authorizedFunctionsHttps(async () => {
  const videos = await fetchChannelVideos();

  await Promise.all(videos.flatMap(async (video) => {
    const { id, snippet, statistics } = video;

    if (!snippet) {
      return [];
    }

    const { title, description, publishedAt } = snippet;
    const optimizedTitle = title?.replace(/^【+[^】]*】+/, '');
    const optimizedDescription = description
      ?.replace(/\n+『モナ・リザの戯言』ではスカッと爽快な漫画をたくさん投稿していきますので、是非チャンネル登録をお願いします！(?:.|\n)*/, '')
      .replace(/^(?:.|\n)*(今回の漫画の主人公)/, '$1');

    if (!id) {
      return [];
    }

    return [
      database.ref('videos').child('basic').child(id).set({
        title: optimizedTitle || '',
        publishedAt: +new Date(publishedAt || ''),
      }),
      database.ref('videos').child('additional').child(id).set({
        description: optimizedDescription || '',
      }),
      // (async () => {
      //   const basicTitleRef = database.ref('videos').child('basic').child(id).child('title');
      //   const snapshot = await basicTitleRef.once('value');
      //   const basicTitle = snapshot.val();

      //   await database.ref('videos').child('basic').child(id).set({
      //     title: basicTitle || optimizedTitle || 'untitled',
      //     publishedAt: +new Date(publishedAt || '')
      //   });
      // })(),
      // (async () => {
      //   const additionalDescriptionRef = database.ref('videos').child('additional').child(id).child('description');
      //   const snapshot = await additionalDescriptionRef.once('value');
      //   const additionalDescription = snapshot.val();

      //   await additionalDescriptionRef.set(additionalDescription || optimizedDescription || '');
      // })(),
      database.ref('videos').child('original').child(id).set({
        title: title || '',
        description: description || '',
      }),
      database.ref('videos').child('statistics').child(id).set({
        viewCount: +(statistics?.viewCount || 0),
        likeCount: +(statistics?.likeCount || 0),
        commentCount: +(statistics?.commentCount || 0),
        updatedAt: Date.now(),
      }),
    ];
  }));

  return {
    videoCount: videos.length,
  };
});
