import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { fromPairs, omit } from 'lodash';
import { authorizedFunctionsHttps } from '../helpers/authorizedFunctionsHttps';
import { fetchChannelVideos } from '../helpers/fetchChannelVideos';

export const captureVideosOnTheChannel = authorizedFunctionsHttps(async () => {
  const firestore = admin.firestore();
  const videos = await fetchChannelVideos();
  const documents = fromPairs(videos.map((video) => {
    const { id, snippet, statistics } = video;

    const body = {
      original: {
        title: snippet?.title,
        description: snippet?.description,
      },
      thumbnails: snippet?.thumbnails,
      statistics: omit(statistics, 'dislikeCount', 'favoriteCount'),
    };

    return [
      id,
      body,
    ];
  }));

  await Promise.all(videos.map((video) => {
    const { id, snippet, statistics } = video;

    const body = {
      original: {
        title: snippet?.title,
        description: snippet?.description,
      },
      thumbnails: snippet?.thumbnails,
      statistics: omit(statistics, 'dislikeCount', 'favoriteCount'),
    };

    if (!id) {
      return;
    }

    return firestore.collection('videos').doc(id).set(body);
  }));

  return {
    videoCount: videos.length,
  };
});
