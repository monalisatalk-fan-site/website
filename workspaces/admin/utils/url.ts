import { Location } from 'vue-router';

export const PAGE_URL = {
  INDEX: '/',
  SIGN_IN: {
    path: '/sign-in',
    query: ['from'],
  },
  DASHBOARD: '/dashboard',
  VIDEOS: '/videos',
  VIDEOS_DETAIL: {
    path: '/videos/_videoId',
    params: ['videoId'],
  },
  CHARACTERS: '/characters',
};

export const url = (
  key: keyof typeof PAGE_URL,
  options: Partial<Omit<Location, 'path'>> = {}
): Location & { toString(): string } => {
  const { params = {}, query = {} } = options;
  const targetPath = PAGE_URL[key];
  const path = typeof targetPath === 'string' ? targetPath : targetPath.path;
  const toString = (): string => {
    const realPath = path.replace(/\/_([^/]+)/, (matched) => {
      const param = params[matched];

      return param ? `/${param}` : `/_${matched}`;
    });
    const queryString = Object.entries(query)
      .flatMap<Array<string | null>>(([key, value]) =>
        value
          ? Array.isArray(value)
            ? value.map((v) => [key, v])
            : [[key, value]]
          : []
      )
      .filter((item): item is [string, string] => !!(item[0] && item[1]))
      .map((q) => q.join('='));

    if (!queryString.length) {
      return realPath;
    }

    return [realPath, queryString.join('&')].join('?');
  };

  return {
    path,
    ...options,
    toString,
  };
};
