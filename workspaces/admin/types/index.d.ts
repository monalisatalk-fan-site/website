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

export type VideoContext = {
  id: string;
  mainCharacters: string[];
  subCharacters: string[];
};

export type DatabaseVideoContext = Omit<VideoContext, 'id'>;

export type Character = {
  id: string;
  name: string;
  color: string;
  textColor: string;
  inactive?: boolean;
  transfer?: string;
};

export type DatabaseCharacter = Omit<Character, 'id'>;
