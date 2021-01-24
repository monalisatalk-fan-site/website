import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const authorizedFunctionsHttps = (handler: (data: any, context: functions.https.CallableContext) => any | Promise<any>) => functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You do not have permission to execute.',
    );
  }

  const user = await admin.auth().getUser(context.auth.uid);

  if (user.providerData.every((provider) => provider.providerId !== 'password')) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You do not have permission to execute.',
    );
  }

  await handler(data, context);
});
