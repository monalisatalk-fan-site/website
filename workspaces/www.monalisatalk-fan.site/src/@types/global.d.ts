interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly SNOWPACK_PUBLIC_FIREBASE_API_KEY: string;
  readonly SNOWPACK_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  readonly SNOWPACK_PUBLIC_FIREBASE_DATABASE_URL: string;
  readonly SNOWPACK_PUBLIC_FIREBASE_PROJECT_ID: string;
  readonly SNOWPACK_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  readonly SNOWPACK_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly SNOWPACK_PUBLIC_FIREBASE_APP_ID: string;
  readonly SNOWPACK_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
}
