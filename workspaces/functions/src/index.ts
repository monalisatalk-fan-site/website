import * as admin from 'firebase-admin';

admin.initializeApp();

export * from './functions/captureVideosOnTheChannel';
export * from './functions/deployHosting';
export * from './functions/scheduledUpdateLatestVideos';
export * from './functions/updateRecommendedVideos';
export * from './functions/updateVideo';
