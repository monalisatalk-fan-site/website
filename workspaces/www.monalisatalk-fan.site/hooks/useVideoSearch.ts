import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';
import { Video } from '~/types';

/** page は 1 始まりの想定 */
export const SEARCH_QUERY_PAGE = 'page';
export const SEARCH_QUERY_ORDER = 'order';
export const SEARCH_QUERY_KEYWORD = 'keyword';
export const DEFAULT_VIDEOS_PER_PAGE = 24;

export type VideoSearchOrder = 'latest' | 'oldest' | 'views';

export type UseVideoSearchResult = {
  videosPerPage: Video[];
  totalVideos: number;
  page: number;
  totalPages: number;
};

export const pickPage = (query: ParsedUrlQuery): number => {
  const page = Number(query[SEARCH_QUERY_PAGE]);

  if (Number.isNaN(page) || page < 0) {
    return 1;
  }

  return page;
};

export const pickOrder = (query: ParsedUrlQuery): VideoSearchOrder => {
  const order = query[SEARCH_QUERY_ORDER];

  switch (order) {
    case 'oldest':
    case 'views':
      return order;
    default:
      return 'latest';
  }
};

export const pickKeyword = (query: ParsedUrlQuery): string | undefined => {
  const keyword = query[SEARCH_QUERY_KEYWORD];

  if (Array.isArray(keyword)) {
    return keyword[0];
  }

  return keyword;
};

export const sortVideoOrder = (
  videos: Video[],
  order: VideoSearchOrder
): Video[] => {
  const compare =
    order === 'oldest'
      ? (a: Video, b: Video): number => a.publishedAt - b.publishedAt
      : order === 'views'
      ? (a: Video, b: Video): number =>
          b.statistics.viewCount - a.statistics.viewCount
      : (a: Video, b: Video): number => b.publishedAt - a.publishedAt;

  return videos.slice().sort(compare);
};

export const filterKeyword = (keyword: string | undefined) => (
  video: Video
): boolean => {
  if (!keyword) {
    return true;
  }

  const { title, description = '' } = video;

  return title.includes(keyword) || description.includes(keyword);
};

export const useVideoSearch = (
  videos: Video[],
  perPage = DEFAULT_VIDEOS_PER_PAGE
): UseVideoSearchResult => {
  const { query } = useRouter();
  const page = useMemo(() => pickPage(query), [query]);
  const order = useMemo(() => pickOrder(query), [query]);
  const keyword = useMemo(() => pickKeyword(query), [query]);
  const filteredVideos = useMemo(
    () => sortVideoOrder(videos, order).filter(filterKeyword(keyword)),
    [videos, order, keyword]
  );
  const totalVideos = useMemo(() => filteredVideos.length, [filteredVideos]);
  const totalPages = useMemo(() => Math.ceil(filteredVideos.length / perPage), [
    filteredVideos,
    perPage,
  ]);
  const videosPerPage = useMemo(
    () => filteredVideos.slice().splice(perPage * (page - 1), perPage),
    [filteredVideos, page, perPage]
  );

  return {
    videosPerPage,
    totalVideos,
    page,
    totalPages,
  };
};
