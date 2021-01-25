import * as admin from 'firebase-admin';
import { database } from '../helpers/database';
import { authorizedFunctionsHttps } from '../helpers/authorizedFunctionsHttps';
import { fetchChannelVideos } from '../helpers/fetchChannelVideos';

export const captureVideosOnTheChannel = authorizedFunctionsHttps(async () => {
  const firestore = admin.firestore();
  const videos = await fetchChannelVideos();

  await Promise.all(videos.flatMap((video) => {
    const { id, snippet, statistics } = video;

    if (!snippet) {
      return [];
    }

    const { title, description, publishedAt } = snippet;

    if (!id) {
      return [];
    }

    return [
      database.ref('videos').child('basic').child(id).update({
        publishedAt: +new Date(publishedAt || ''),
      }),
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
