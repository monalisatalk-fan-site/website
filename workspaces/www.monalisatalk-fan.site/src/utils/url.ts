// import qs from 'qs';
// import urlJoin from 'url-join';

export type ParamValueType = string | number | boolean;
export type PathType = `/${string}` | `https://${string}`;

export type UrlOptions = {
  path: PathType;
  query?: Record<string, ParamValueType>;
  hash?: string;
};

export const FAKE_ORIGIN = 'https://fake-url-origin.lollipop.onl';

export const url = (options: UrlOptions | PathType): string => {
  if (typeof options === 'string') {
    return options;
  }

  return ''

  // const { path, query = {}, hash } = options;
  // const fullUrl = /^https?:/.test(path) ? path : urlJoin(FAKE_ORIGIN, path);
  // const url = new globalThis.URL(fullUrl);
  // const querystring = qs.stringify(Object.fromEntries(Object.entries(query).filter(([key, value]) => value)));

  // if (querystring) {
  //   url.search = [, querystring].join('?');
  // }

  // if (hash) {
  //   url.hash = hash;
  // }

  // return url.toString().replace(FAKE_ORIGIN, '');
};
