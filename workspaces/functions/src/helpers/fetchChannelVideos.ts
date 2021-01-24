import * as functions from 'firebase-functions';
import { google, youtube_v3 } from 'googleapis';
import { flatMap, range } from 'lodash-es';

/** モナ・リザの戯言チャンネルのID */
const CHANNEL_ID = 'UCSSkv6tmPpi8d1IrWegypsA';
/** 最後の動画がアップロードされた月 */
const OLDEST_VIDEO_YEAR = 2019;
/** 最後の動画がアップロードされた月 */
const OLDEST_VIDEO_MONTH = 6;

const youtube = google.youtube('v3');

export const fetchChannelVideos = async (): Promise<youtube_v3.Schema$Video[]> => {
  const d = new Date();
  const months: number[][] = [];

  for (let year = d.getFullYear(); year >= OLDEST_VIDEO_MONTH[0]; year -= 1) {
    for (let month = 12; month > 0; month -= 1) {
      if (year === d.getFullYear() && month > d.getMonth() + 1) {
        continue;
      }

      months.push([year, month]);

      if (OLDEST_VIDEO_MONTH === month && OLDEST_VIDEO_YEAR === year) {
        break;
      }
    }
  }

  const videoIdListResponse = await Promise.all(months.map(([year, month]) => youtube.search.list({
    key: functions.config().gcp.api_key,
    part: ['id'],
    channelId: CHANNEL_ID,
    publishedAfter: new Date(year, month - 1, 1, 0, 0, 0, 0).toISOString(),
    publishedBefore: new Date(year, month, 0, 23, 59, 59, 999).toISOString(),
  })));
  const videoIdList = flatMap(videoIdListResponse, ({ data }) => data.items.map(({ id: { videoId }}) => videoId));

  const pages = Math.ceil(videoIdList.length / 50);
  const videoListResponse = await Promise.all(range(0, pages).map((index) => {
    const baseIndex = index * 50;
    const id = videoIdList.slice().splice(baseIndex, 50);

    return youtube.videos.list({
      part: ['snippet', 'statistics'],
      id,
      maxResults: 50,
    });
  }));
  const videos = flatMap(videoListResponse, ({ data: { items = [] } }) => items);

  return videos;
};
