import { defineNuxtPlugin } from '@nuxtjs/composition-api';
import { library } from '@fortawesome/fontawesome-svg-core';
import {} from '@fortawesome/free-regular-svg-icons';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default defineNuxtPlugin(() => {
  library.add(faUser, faLock, faYoutube, faTwitter);
});
