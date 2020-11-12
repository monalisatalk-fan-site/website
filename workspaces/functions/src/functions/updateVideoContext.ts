import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const bucket = admin.storage().bucket();
const VIDEO_CONTEXT_FILE = 'resources/video-context/data.json';
const VIDEO_CONTEXT_META_FILE = 'resources/video-context/meta.json';

export const updateVideoContext = functions.https.onCall(
  async (data, context) => {
    if (!context.auth?.uid) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        '管理者アカウントにログインしてくださいログインしてください'
      );
    }

    const ref = admin.database().ref('videoContext');
    const snapshot = await ref.once('value');
    const value: Record<string, any> | null = snapshot.val();
    const items = value
      ? Object.entries(value).map(([id, context]) => ({ ...context, id }))
      : [];
    const videoContextFile = bucket.file(VIDEO_CONTEXT_FILE);
    const videoContextMetaFile = bucket.file(VIDEO_CONTEXT_META_FILE);
    const timestamp = new Date().toISOString();

    await Promise.all([
      videoContextMetaFile.save(
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
      videoContextFile.save(
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
  }
);
