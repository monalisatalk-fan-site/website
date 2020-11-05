export type ReactiveState<T> = {
  value: T;
  update: (value: T) => void;
};

export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  publishedAt: string;
};

export type VideoResource = {
  updatedAt: string;
  items: Video[];
};

export type VideoMeta = {
  updatedAt: string;
};
