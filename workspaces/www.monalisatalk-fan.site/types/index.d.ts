export type VideoStatistics = {
  viewCount: number;
  likeCount: number;
  commentCount: number;
  updatedAt: number;
};

export type Video = {
  id: string;
  title: string;
  description?: string;
  publishedAt: number;
  voiceActors: string[];
  statistics: VideoStatistics;
};

export type VoiceActor = {
  id: string;
  name: string;
};
