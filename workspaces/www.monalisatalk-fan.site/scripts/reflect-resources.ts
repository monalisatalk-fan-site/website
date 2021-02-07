import firebase from 'firebase';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { ResourcesJson } from '../src/types';
import { TypedDatabase } from '../../shared/types/database';

dotenv.config({ path: path.join(__dirname, '../.env') });

const FILE_NAME = 'resources.json';
const DIST_PATH = path.join(__dirname, '../static', FILE_NAME);

const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
});

const database = (app.database() as unknown) as TypedDatabase;

const parseVideos = async (): Promise<ResourcesJson['videos']> => {
  const snapshot = await database.ref('videos').once('value');
  const value = snapshot.val();

  if (!value) {
    throw new Error('videos/ のデータを参照できませんでした');
  }

  return Object.entries(value.basic)
    .map(([id, { title, publishedAt }]) => {
      const { description } = value.additional[id];
      const voiceActors = Object.keys(value.voiceActors[id] || {});
      const { viewCount, likeCount, updatedAt } = value.statistics[id];
      const statistics = {
        viewCount,
        likeCount,
        updatedAt,
      };

      return {
        id,
        title,
        description,
        publishedAt,
        actors: [],
        tags: [],
        voiceActors,
        statistics,
      };
    });
};

const parseVoiceActors = async (): Promise<ResourcesJson['voiceActors']> => {
  const snapshot = await database.ref('voiceActors').once('value');
  const value = snapshot.val();

  if (!value) {
    throw new Error('voiceActors/ のデータを参照できませんでした');
  }

  return Object.entries(value)
    .map(([id, { name }]) => ({
      id,
      name
    }));
};

(async () => {
  const [
    videos,
    voiceActors,
  ] = await Promise.all([
    parseVideos(),
    parseVoiceActors(),
  ]);

  database.goOffline();

  const json: ResourcesJson = {
    videos,
    actors: [],
    voiceActors,
  };

  fs.writeFileSync(DIST_PATH, JSON.stringify(json), 'utf-8');
})();
