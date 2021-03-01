import * as functions from 'firebase-functions';
import { applyVideosToDatabase } from '../helpers/applyVideosToDatabase';
import { fetchVideosFromId } from '../helpers/fetchVideosFromId';
import { fetchLatestVideoIdList } from '../helpers/fetchLatestVideoIdList';
import { deployHosting } from '../helpers/deployHosting';

export const scheduledUpdateLatestVideos = functions.pubsub
  .schedule('every 2 hours')
  .onRun(async () => {
    const videoIdList = await fetchLatestVideoIdList(14);
    const videos = await fetchVideosFromId(videoIdList);

    await applyVideosToDatabase(videos);

    await deployHosting();

    return null;
  });
