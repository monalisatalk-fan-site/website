import * as admin from 'firebase-admin';
import { authorizedFunctionsHttps } from '../helpers/authorizedFunctionsHttps';
import { fetchChannelVideos } from '../helpers/fetchChannelVideos';

export const captureVideosOnTheChannel = authorizedFunctionsHttps(async () => {
  const firestore = admin.firestore();
  const videos = await fetchChannelVideos();

  await Promise.all(videos.map((video) => {
    const { id, snippet, statistics } = video;

    if (!snippet) {
      return;
    }

    const { title, description, publishedAt, thumbnails } = snippet;

    const body = {
      original: {
        title: title,
        description: description,
      },
      publishedAt: publishedAt,
      thumbnails: thumbnails,
      statistics,
    };

    if (!id) {
      return;
    }

    return firestore.collection('videos').doc(id).update(body);
  }));

  return {
    videoCount: videos.length,
  };
});
