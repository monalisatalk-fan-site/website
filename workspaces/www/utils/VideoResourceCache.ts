import { Video, VideoResource } from '@/types';

const LOCAL_STORAGE_KEY = 'local_resources_cache';

export class VideoResourceCache {
  /** ローカルのキャッシュデータ */
  private cacheData: null | VideoResource;

  constructor() {
    this.cacheData = this.getLocalCache();
  }

  /** ビデオ一覧 */
  public get videos(): Video[] {
    return this.cacheData ? this.cacheData.items : [];
  }

  /**
   * ローカルのキャッシュを更新する
   * @param data ビデオデータ
   */
  public update(data: VideoResource): void {
    this.cacheData = data;

    if (process.client) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }
  }

  /**
   * キャッシュの有効性をチェック
   * @param updatedAt 更新日時
   */
  public checkCacheAvailability(updatedAt: string): boolean {
    if (this.cacheData == null) {
      return false;
    }

    const cacheTimestamp = new Date(this.cacheData.updatedAt);
    const paramTimestamp = new Date(updatedAt);

    if (Number.isNaN(cacheTimestamp) || Number.isNaN(paramTimestamp)) {
      return false;
    }

    return cacheTimestamp >= paramTimestamp;
  }

  /**
   * LocalStorageに保存しているキャッシュデータを取得
   */
  private getLocalCache(): null | VideoResource {
    if (!process.client) {
      return null;
    }

    const cacheString = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!cacheString) {
      return null;
    }

    try {
      const cache = JSON.parse(cacheString);

      if (cache == null || !('updatedAt' in cache) || !('items' in cache)) {
        return null;
      }

      return cache as VideoResource;
    } catch (err) {
      return null;
    }
  }
}
