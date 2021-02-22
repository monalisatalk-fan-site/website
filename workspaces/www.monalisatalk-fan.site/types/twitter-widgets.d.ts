type UnknownCallback = () => void;

export type EmbeddedTweetParameter = Partial<{
  id: string;
  cards: 'hidden';
  conversation: 'none';
  theme: 'dark';
  width: number;
  align: 'left' | 'right' | 'center';
  lang: string;
  dnt: boolean;
}>;

export type TwitterWidgets = {
  events: {
    bind: UnknownCallback;
    unbind: UnknownCallback;
    trigger: UnknownCallback;
  };
  init: boolean;
  ready: UnknownCallback;
  widgets: {
    createDMButton: UnknownCallback;
    createFollowButton: UnknownCallback;
    createGridFromCollection: UnknownCallback;
    createHashtagButton: UnknownCallback;
    createMentionButton: UnknownCallback;
    createMoment: UnknownCallback;
    createPeriscopeOnAirButton: UnknownCallback;
    createShareButton: UnknownCallback;
    createTimeline: UnknownCallback;
    createTweet(
      tweetID: string,
      targetEl: HTMLElement,
      options?: EmbeddedTweetParameter
    ): Promise<HTMLElement>;
    createTweetEmbed: UnknownCallback;
    createVideo: UnknownCallback;
    load: UnknownCallback;
  };
};
