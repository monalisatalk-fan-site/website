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
