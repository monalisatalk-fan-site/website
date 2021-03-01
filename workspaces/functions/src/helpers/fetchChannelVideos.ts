import * as functions from 'firebase-functions';
import { google, youtube_v3 } from 'googleapis';
import { flatMap, range } from 'lodash';

/** モナ・リザの戯言チャンネルのID */
export const CHANNEL_ID = 'UCSSkv6tmPpi8d1IrWegypsA';
/** モナ・リザの戯言おすすめ動画プレイリストのID */
export const RECOMMENDED_VIDEOS_CHANNEL_ID =
  'PLDiYkQqys3WY83qMHE5TcIp-mK4-NPmF4';
/** 最後の動画がアップロードされた月 */
export const OLDEST_VIDEO_YEAR = 2019;
/** 最後の動画がアップロードされた月 */
export const OLDEST_VIDEO_MONTH = 6;
export const GCP_API_KEY = functions.config().gcp.api_key;

console.log(`Using API_KEY is ${GCP_API_KEY}`);

export const youtube = google.youtube('v3');

export const fetchChannelVideos = async (): Promise<
  youtube_v3.Schema$Video[]
> => {
  const d = new Date();
  const months: number[][] = [];

  for (let year = d.getFullYear(); year >= OLDEST_VIDEO_YEAR; year -= 1) {
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

  try {
    const videoIdListResponse = await Promise.all(
      months.map(
        async ([year, month]) =>
          await youtube.search.list({
            key: GCP_API_KEY,
            part: ['id'],
            channelId: CHANNEL_ID,
            maxResults: 50,
            publishedAfter: new Date(
              year,
              month - 1,
              1,
              0,
              0,
              0,
              0
            ).toISOString(),
            publishedBefore: new Date(
              year,
              month,
              0,
              23,
              59,
              59,
              999
            ).toISOString(),
          })
      )
    );
    const videoIdList = flatMap(
      videoIdListResponse,
      ({ data: { items = [] } }) => items.map(({ id }) => id?.videoId)
    ).filter(<T>(id: T): id is NonNullable<T> => id != null);

    console.log(`Found ${videoIdList.length} videos in channel ${CHANNEL_ID}`);

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
  } catch (err) {
    console.log(JSON.stringify(err));

    if (typeof err === 'object' && Array.isArray(err.errors)) {
      const [error] = err.errors;
      const message = error?.message;

      throw new functions.https.HttpsError('internal', message);
    }

    throw new functions.https.HttpsError(
      'internal',
      'Happen error in fetchChannelVideos()'
    );
  }
};
