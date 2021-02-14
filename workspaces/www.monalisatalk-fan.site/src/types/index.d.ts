/** 文字列に安全にキャストできる型 */
type StringLike = string | number | boolean | bigint;

/** 読み込みを要するリソースの型 */
export type LoadableResource<T extends Record<string, any>, Error = unknown> = {
  isLoading: boolean;
  error: Error | null;
} & T;

/** 動画のデータ */
export type Video = {
  id: string;
  title: string;
  description?: string;
  publishedAt: number;
  actors: string[];
  tags: string[];
  voiceActors: string[];
  statistics: {
    viewCount: number;
    likeCount: number;
    updatedAt: number;
  };
};

/** 動画のリソースファイル */
export type ResourcesJson = {
  videos: Array<Video>;
  actors: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  voiceActors: Array<{
    id: string;
    name: string;
  }>;
};
