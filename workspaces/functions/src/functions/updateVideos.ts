import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { fetchYouTubeVideos } from '../helpers/fetchYouTubeVideos';

const bucket = admin.storage().bucket();
const VIDEO_SNIPPET_FILE = 'resources/video-snippet.json';
const VIDEO_SNIPPET_META_FILE = 'resources/video-snippet-meta.json';

export const updateVideos = functions.https.onCall(async () => {
  const items = await fetchYouTubeVideos(true);
  const videoSnippetFile = bucket.file(VIDEO_SNIPPET_FILE);
  const videoSnippetMetaFile = bucket.file(VIDEO_SNIPPET_META_FILE);
  const timestamp = admin.database.ServerValue.TIMESTAMP;

  console.log(timestamp);
  console.log(timestamp.toString());

  await Promise.all([
    videoSnippetMetaFile.save(
      JSON.stringify({
        updatedAt: timestamp,
      }),
      {
        gzip: true,
        metadata: {
          contentType: 'application/json',
        },
      }
    ),
    videoSnippetFile.save(
      JSON.stringify({
        updatedAt: timestamp,
        items,
      }),
      {
        gzip: true,
        metadata: {
          cacheControl: 'public,max-age=31536000',
          contentType: 'application/json',
        },
      }
    ),
  ]);
});
