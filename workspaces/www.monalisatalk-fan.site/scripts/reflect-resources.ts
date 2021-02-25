import firebase from 'firebase';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { TypedDatabase } from '../../shared/types/database';

dotenv.config({ path: path.join(__dirname, '../.env') });

type Video = {
  id: string;
  title: string;
  description?: string;
  publishedAt: number;
  actors: string[];
  tags: string[];
  voiceActors: string[];
  statistics: {
    viewCount: number;
    likeCount: number;
    updatedAt: number;
  };
};

type ResourcesJson = {
  videos: Video[];
  actors: Array<{
    id: string;
    name: string;
    color: string;
    textColor: string;
  }>;
  voiceActors: Array<{
    id: string;
    name: string;
  }>;
  recommendedVideos: Video[];
};

const DIST_PATH = path.join(__dirname, '../assets/data/resources.json');

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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { description } = value.additional[id]!;
      const voiceActors = Object.keys(value.voiceActors[id] || {});
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { viewCount, likeCount, updatedAt } = value.statistics[id]!;
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
    })
    .sort((a, b) => b.publishedAt - a.publishedAt);
};

const parseVoiceActors = async (): Promise<ResourcesJson['voiceActors']> => {
  const snapshot = await database.ref('voiceActors').once('value');
  const value = snapshot.val();

  if (!value) {
    throw new Error('voiceActors/ のデータを参照できませんでした');
  }

  return Object.entries(value).map(([id, { name }]) => ({
    id,
    name,
  }));
};

const parseRecommendedVideoIdList = async (): Promise<string[]> => {
  const snapshot = await database.ref('recommendedVideos').once('value');
  const value = snapshot.val();

  if (!value) {
    throw new Error('voiceActors/ のデータを参照できませんでした');
  }

  return value;
};

(async () => {
  const [videos, voiceActors, recommendedVideoIdList] = await Promise.all([
    parseVideos(),
    parseVoiceActors(),
    parseRecommendedVideoIdList(),
  ]);
  const recommendedVideos = recommendedVideoIdList.map((videoId) => videos.find(({ id }) => id === videoId)).filter((video): video is NonNullable<typeof video> => video != null);

  database.goOffline();

  const json: ResourcesJson = {
    videos,
    actors: [],
    voiceActors,
    recommendedVideos,
  };

  await fs.promises.writeFile(DIST_PATH, JSON.stringify(json), 'utf-8');
})();
