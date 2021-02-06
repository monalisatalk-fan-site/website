import { NuxtOptions } from '@nuxt/types';
import firebase from 'firebase/app';
import 'firebase/database';
import { Video } from '../types';
import { TypedDatabase } from '../../shared/types/database';

type NuxtOptionsGenerateRoute = string | { route: string, payload: any }

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} = process.env;

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
  });
}

const getVideoPaths = async (videos: Video[]): Promise<NuxtOptionsGenerateRoute[]> => {
  return videos.map(({ id }) => ({
    route: `/video/${id}`,
    payload: videos,
  }));
};

const getCalendarPaths = (videos: Video[]): NuxtOptionsGenerateRoute[] => {
  const d = new Date();
  const paths: NuxtOptionsGenerateRoute[] = [];

  for (let year = 2019; year <= d.getFullYear(); year += 1) {
    for (let month = 1; month <= 12; month += 1) {
      if (
        (year === 2019 && month < 6) ||
        (year === d.getFullYear() && month > d.getMonth() + 1)
      ) {
        continue;
      }

      paths.push({
        route: `/calendar/${year}/${month}`,
        payload: videos,
      });
    }
  }

  return paths;
};

export const getGenerateRoutes = async (): Promise<NuxtOptionsGenerateRoute[]> => {
  const database = (firebase.database() as unknown) as TypedDatabase;
  const snapshot = await database.ref('videos').once('value');
  const data = snapshot.val();

  if (!data) {
    return [];
  }

  const videos = Object.entries(data.basic)
    .map(([id, basic]) => {
      const { [id]: additional } = data.additional;
      const { [id]: voiceActors = [] } = data.voiceActors;
      const { [id]: statistics } = data.statistics;

      // 存在チェック
      if (!basic || !basic.title || !basic.publishedAt || !additional || !statistics) {
        return;
      }

      const { title, publishedAt } = basic;
      const { description } = additional;

      return {
        id,
        title,
        description,
        publishedAt,
        voiceActors: Object.keys(voiceActors),
        statistics,
      };
    })
    .filter(<T>(video: T): video is NonNullable<T> => video != null)
    .sort((a, b) => b.publishedAt - a.publishedAt);

  const pathsList = await Promise.all([
    getVideoPaths(videos),
    getCalendarPaths(videos),
  ]);

  return [
    {
      route: '/',
      payload: videos,
    },
    ...pathsList.flatMap((paths) => paths),
  ];
};
