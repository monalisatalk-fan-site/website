import * as functions from 'firebase-functions';
import { google } from 'googleapis';

const youtube = google.youtube('v3');
const MONALISATALK_YOUTUBE_CHANNEL_ID = 'UCSSkv6tmPpi8d1IrWegypsA';

export const fetchYouTubeVideos = async (
  pagination = false,
  pageToken?: string
): Promise<unknown[]> => {
  const {
    data: { items = [], nextPageToken },
  } = await youtube.search.list({
    key: functions.config().gcp.api_key,
    part: ['snippet'],
    channelId: MONALISATALK_YOUTUBE_CHANNEL_ID,
    maxResults: 50,
    pageToken,
    order: 'date',
  });

  const data = items
    .map(({ id, snippet }) => {
      if (!id || !id.videoId || !snippet) {
        return null;
      }

      const { title, description, thumbnails, publishedAt } = snippet;

      if (!title || !thumbnails || !publishedAt) {
        return null;
      }

      const thumbnail = thumbnails.high?.url || thumbnails.high?.url;

      return {
        id: id.videoId,
        title,
        description,
        thumbnail,
        publishedAt,
      };
    })
    .filter((video): video is NonNullable<typeof video> => video != null);

  if (!pagination || !nextPageToken) {
    return data;
  }

  return [...data, ...(await fetchYouTubeVideos(pagination, nextPageToken))];
};
