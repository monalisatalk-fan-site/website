import { TwitterWidgets } from '~/types/twitter-widgets';

declare global {
  interface Window {
    twttr?: TwitterWidgets;
  }
}

export {};
