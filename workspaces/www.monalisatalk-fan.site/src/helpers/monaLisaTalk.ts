import { read } from 'fs';
import { readable } from 'svelte/store';
import { storage } from './firebase-app';

export type LoadableResource<T extends Record<string, any>> = {
  isLoading: boolean;
  error: any | null;
} & T;

export const originalData = readable<LoadableResource<{ data: any }> | null>(null, (set) => {
  storage.ref('any').getDownloadURL()
    .then((url) => {

    });
});
