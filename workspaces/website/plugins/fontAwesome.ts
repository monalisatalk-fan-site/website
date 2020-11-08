import { defineNuxtPlugin } from '@nuxtjs/composition-api';
import { library } from '@fortawesome/fontawesome-svg-core';
import {} from '@fortawesome/free-regular-svg-icons';
import {
  faUser,
  faLock,
  faFilm,
  faStar,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default defineNuxtPlugin(() => {
  library.add(
    faUser,
    faLock,
    faTachometerAlt,
    faFilm,
    faStar,
    faYoutube,
    faTwitter
  );
});
