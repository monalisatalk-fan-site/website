import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

import.meta.url

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_APP_ID,
    measurementId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_MEASUREMENT_ID,
  });
}

/** Firebase Authentication Instance */
export const auth = firebase.auth();

/** Firebase Cloud Storage Instance */
export const storage = firebase.storage();
