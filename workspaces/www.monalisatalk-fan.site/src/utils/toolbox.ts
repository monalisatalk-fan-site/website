/**
 * @file 抽象的な処理
 */

/** ランタイムがクライアントサイドか */
export const isClient = (): boolean => typeof globalThis.window !== 'undefined';

/** ランタイムがサーバーサイドか */
export const isServer = (): boolean => typeof globalThis.window === 'undefined';
