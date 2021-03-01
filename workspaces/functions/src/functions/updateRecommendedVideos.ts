import * as functions from 'firebase-functions';
import { database } from '../helpers/database';
import {
  youtube,
  RECOMMENDED_VIDEOS_CHANNEL_ID,
  GCP_API_KEY,
} from '../helpers/fetchChannelVideos';

export const updateRecommendedVideos = functions.https.onRequest(
  async (req, res) => {
    if (req.method !== 'POST') {
      res.sendStatus(404);

      return;
    }

    const response = await youtube.playlistItems.list({
      key: GCP_API_KEY,
      part: ['contentDetails'],
      playlistId: RECOMMENDED_VIDEOS_CHANNEL_ID,
      maxResults: 100,
    });

    const {
      data: { items = [] },
    } = response;
    const videoIdList = items
      .map(({ contentDetails }) => contentDetails?.videoId)
      .filter(
        (videoId): videoId is NonNullable<typeof videoId> => videoId != null
      );
    // const values = videoIdList.reduce<Record<string, boolean>>((values, videoId) => {
    //   values[videoId] = true;

    //   return values;
    // }, {});

    await database.ref('recommendedVideos').set(videoIdList);

    res.status(200).json({
      message: 'Recommended videos updated',
      data: {
        videos: videoIdList,
      },
    });
  }
);
