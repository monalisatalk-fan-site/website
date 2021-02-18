import * as admin from 'firebase-admin';

admin.initializeApp();

export * from './functions/captureVideosOnTheChannel';
export * from './functions/updateVideo';
