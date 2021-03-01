import * as functions from 'firebase-functions';
import { google, youtube_v3 } from 'googleapis';
import { flatMap, range } from 'lodash';

export const GCP_API_KEY = functions.config().gcp.api_key;
export const youtube = google.youtube('v3');

export const fetchVideosFromId = async (
  videoIdList: string[]
): Promise<youtube_v3.Schema$Video[]> => {
  const pages = Math.ceil(videoIdList.length / 50);
  const videoListResponse = await Promise.all(
    range(0, pages).map((index) => {
      const baseIndex = index * 50;
      const id = videoIdList.slice().splice(baseIndex, 50);

      return youtube.videos.list({
        key: GCP_API_KEY,
        part: ['snippet', 'statistics'],
        id,
        maxResults: 50,
      });
    })
  );
  const videos = flatMap(
    videoListResponse,
    ({ data: { items = [] } }) => items
  );

  return videos;
};
