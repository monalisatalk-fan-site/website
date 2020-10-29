import { useCallback, useEffect, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';
import { storage } from '@/helpers';
import { Video, VideoResource } from '@/types';

const videoResourceState = atom<VideoResource | null>({
  key: 'videoResourceState',
  default: null,
});

const videosLoadingState = atom<boolean | null>({
  key: 'videosLoadingState',
  default: null,
});

type VideosHelper = {
  updatedAt: string | null;
  videos: Video[];
  isLoading: boolean;
  update(): Promise<void>;
};

export const useVideos = (): VideosHelper => {
  const [videoResource, setVideoResource] = useRecoilState(videoResourceState);
  const [isLoading, setLoadingState] = useRecoilState(videosLoadingState);
  const updatedAt = useMemo(
    (): string | null => (videoResource ? videoResource.updatedAt : null),
    [videoResource]
  );
  const videos = useMemo(
    (): Video[] => (videoResource ? videoResource.items : []),
    [videoResource]
  );

  const update = useCallback(async () => {
    setLoadingState(true);

    try {
      const downloadUrl = await storage
        .ref()
        .child('resources/video-snippet/data.json')
        .getDownloadURL();

      const response = await fetch(downloadUrl);
      const data: VideoResource = await response.json();

      setVideoResource(data);
    } finally {
      setLoadingState(false);
    }
  }, [setLoadingState, setVideoResource]);

  useEffect(() => {
    if (isLoading == null) {
      update();
    }
  }, [isLoading, update]);

  return {
    updatedAt,
    videos,
    isLoading: !!isLoading,
    update,
  };
};
