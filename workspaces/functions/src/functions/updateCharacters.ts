import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const bucket = admin.storage().bucket();
const CHARACTERS_FILE = 'resources/characters/data.json';
const CHARACTERS_META_FILE = 'resources/characters/meta.json';

export const updateCharacters = functions.https.onCall(
  async (data, context) => {
    if (!context.auth?.uid) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        '管理者アカウントにログインしてくださいログインしてください'
      );
    }

    const ref = admin.database().ref('characters');
    const snapshot = await ref.once('value');
    const value: Record<string, any> | null = snapshot.val();
    const items = value
      ? Object.entries(value).forEach(([id, context]) => ({ ...context, id }))
      : [];
    const charactersFile = bucket.file(CHARACTERS_FILE);
    const charactersMetaFile = bucket.file(CHARACTERS_META_FILE);
    const timestamp = new Date().toISOString();

    await Promise.all([
      charactersMetaFile.save(
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
      charactersFile.save(
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
