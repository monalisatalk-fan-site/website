import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { fromPairs, omit } from 'lodash-es';
import { authorizedFunctionsHttps } from '../helpers/authorizedFunctionsHttps';
import { fetchChannelVideos } from '../helpers/fetchChannelVideos';

export const captureVideosOnTheChannel = authorizedFunctionsHttps(async (data, context) => {
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

  await firestore.doc('videos').update(documents);

  return {
    videoCount: videos.length,
  };
});
