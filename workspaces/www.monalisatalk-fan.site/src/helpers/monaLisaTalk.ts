import { read } from 'fs';
import { readable } from 'svelte/store';
import { storage } from './firebase-app';
import { LoadableResource } from '../types';

export const originalData = readable<LoadableResource<{ data: any }> | null>(null, (set) => {
  storage.ref('any').getDownloadURL()
    .then((url) => {

    });
});
