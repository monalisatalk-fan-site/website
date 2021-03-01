import { authorizedFunctionsHttps } from '../helpers/authorizedFunctionsHttps';
import { fetchChannelVideos } from '../helpers/fetchChannelVideos';
import { applyVideosToDatabase } from '../helpers/applyVideosToDatabase';

export const captureVideosOnTheChannel = authorizedFunctionsHttps(async () => {
  const videos = await fetchChannelVideos();

  await applyVideosToDatabase(videos);

  return {
    videoCount: videos.length,
  };
});
