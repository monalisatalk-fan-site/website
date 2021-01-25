import { DefineTypedDatabase } from './database-typekit';

export type DatabaseStructure = {
  /** 管理者 */
  administrators: {
    basic: {
      $uid: boolean;
    };
    connections: {
      $uid: {
        $connectionId: boolean;
      };
    };
  };
  /** 動画情報 */
  videos: {
    activation: {
      $videoId: boolean;
    };
    basic: {
      $videoId: {
        title: string;
        publishedAt: number;
      };
    };
    additional: {
      $videoId: {
        description: string;
      };
    };
    original: {
      $videoId: {
        title: string;
        description: string;
      };
    };
    actors: {
      $videoId: {
        $actorId: boolean;
      };
    };
    tags: {
      $videoId: {
        $tagId: boolean;
      };
    };
    voiceActors: {
      $voiceActorId: boolean;
    };
    statistics: {
      $videoId: {
        viewCount: number;
        likeCount: number;
        commentCount: number;
        updatedAt: number;
      };
    };
  };
  /** 出演者情報 */
  actors: {
    basic: {
      $actorId: {
        name: string;
        color: string;
      };
    };
    additional: {
      $actorId: {
        createdAt: number;
      };
    };
  };
  /** 声優情報 */
  voiceActors: {
    basic: {
      $voiceActorId: {
        name: string;
      };
    };
  };
};

export type TypedDatabase = DefineTypedDatabase<DatabaseStructure>;
