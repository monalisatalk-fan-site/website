import axios from 'axios';

const GITHUB_ACCESS_TOKEN = '';

export const deployHosting = async (): Promise<void> => {
  console.log('Deploy to hosting (live-channel)');

  await axios.post(`https://api.github.com/repos/monalisatalk-fan.site/website/dispatches`, {
    event_type: 'deploy',
  }, {
    headers: {
      Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
      Accept: 'application/vnd.github.everest-preview+json',
      'Content-Type': 'application/json',
    }
  });
};
