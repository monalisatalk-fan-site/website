import React from 'react';
import { EmbededTweet } from '~/components/EmbededTweet';
import illustration from '~/assets/data/illustration.json';

const IllustPage: React.VFC = () => {
  return (
    <ul>
      {illustration.map(({ tweetId }) => (
        <EmbededTweet tweetId={tweetId} key={tweetId} />
      ))}
    </ul>
  );
};

export default IllustPage;
