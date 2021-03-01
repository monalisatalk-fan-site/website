import { authorizedFunctionsHttps } from '../helpers/authorizedFunctionsHttps';
import { deployHosting } from '../helpers/deployHosting';

export const deployLiveChannelHosting = authorizedFunctionsHttps<void>(async () => {
  await deployHosting();
});
