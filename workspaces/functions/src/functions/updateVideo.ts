import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import axios from 'axios';
import { youtube, CHANNEL_ID, GCP_API_KEY } from '../helpers/fetchChannelVideos';

export const SLACK_CHANNEL_WEBHOOK_URL = functions.config().slack.webhook_url;

export const updateVideo = functions.https.onRequest(async (req, res) => {
  const firestore = admin.firestore();

  if (req.method !== 'POST') {
    res.sendStatus(404);

    return;
  }

  if (!req.body || !req.body.url) {
    res.status(400).json({ message: 'Invalid parameters', data: req.body });

    return;
  }

  const { url } = req.body;
  const matches = /youtube\.com\/v\/([^/?#]+)/.exec(url);

  if (!matches) {

    res.status(400).send({ message: `Invalid url`, data: url });

    return;
  }

  const videoId = matches[1];

  const response = await youtube.videos.list({
    key: GCP_API_KEY,
    part: ['snippet', 'statistics'],
    id: [videoId],
    maxResults: 1,
  });

  const { data: { items: [video] = [] } } = response;

  if (!video) {
    res.status(400).json({ message: `Video is not found`, data: videoId });

    return;
  }

  const { snippet, statistics } = video;

  if (!snippet) {
    res.status(400).json({ message: 'Receive a invalid video resource', data: video });

    return;
  }

  const { title, description, publishedAt, thumbnails, channelId } = snippet;

  if (channelId !== CHANNEL_ID) {
    res.status(400).json({ message: 'Invalid channel id', data: channelId });

    return;
  }

  const body = {
    original: {
      title,
      description,
    },
    publishedAt,
    thumbnails,
    statistics,
  };

  await firestore.collection('videos').doc(videoId).update(body);

  try {
    await axios.post(SLACK_CHANNEL_WEBHOOK_URL, {
      icon_emoji: ':alien:',
      username: 'monalisatalk-bot',
      unfurl_links: true,
      attachments: [
        {
          fallback: `[NEW VIDEO] ${title}`,
          pretext: `モナ・リザの戯言チャンネルに動画が投稿されました\nhttps://www.youtube.com/watch?v=${videoId}`,
          color: '#FC0006',
          fields: [
            {
              title,
              value: `<https://admin-monalisatalk-fan-site.web.app/authorized/videos/${videoId}|管理画面で動画情報情報を編集する>`,
              short: false,
            },
          ],
        },
      ],
    });
  } catch (err) {
    console.error(err);
  }

  res.status(200).json({
    message: 'Video updated',
    data: {
      id: videoId,
      title,
      publishedAt
    },
  });
});
