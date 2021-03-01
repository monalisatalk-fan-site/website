import * as functions from 'firebase-functions';
import { google } from 'googleapis';

/** モナ・リザの戯言チャンネルのID */
export const CHANNEL_ID = 'UCSSkv6tmPpi8d1IrWegypsA';
export const GCP_API_KEY = functions.config().gcp.api_key;

export const youtube = google.youtube('v3');

export const fetchLatestVideoIdList = async (
  limit: number
): Promise<string[]> => {
  const videoIdListResponse = await youtube.search.list({
    key: GCP_API_KEY,
    part: ['id'],
    channelId: CHANNEL_ID,
    maxResults: limit,
  });
  const videoIdList = videoIdListResponse.data.items
    .map(({ id }) => id?.videoId)
    .filter(<T>(id: T): id is NonNullable<T> => id != null);

  return videoIdList;
};
