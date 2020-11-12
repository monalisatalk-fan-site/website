import * as admin from 'firebase-admin';

admin.initializeApp();

export * from './functions/updateCharacters';
export * from './functions/updateVideoContext';
export * from './functions/updateVideos';
