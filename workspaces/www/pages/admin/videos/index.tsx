import React, { FC, useCallback, useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/AdminLayout';
import { useVideos, functions } from '@/helpers';

const AdminVideosPage: FC = () => {
  const { updatedAt, videos, update } = useVideos();
  const [isLoading, setLoadingState] = useState(false);
  const updateVideos = useCallback(async () => {
    setLoadingState(true);

    try {
      const updateVideos = functions.httpsCallable('updateVideos');

      await updateVideos();

      await update();
    } finally {
      setLoadingState(false);
    }
  }, [setLoadingState, update]);

  return (
    <AdminLayout>
      <div className="">admin video page</div>
      <button onClick={updateVideos} disabled={isLoading}>
        動画データを更新
        {isLoading
          ? '更新中...'
          : updatedAt
          ? `(Last updated: ${new Date(updatedAt)})`
          : null}
      </button>
      {videos.map((video) => (
        <Link key={video.id} href={`/admin/videos/${video.id}`}>
          <a className="flex px-4 py-2 hover:bg-indigo-100">
            <img
              className="w-32 mr-3"
              src={video.thumbnail}
              alt="サムネイル"
              width="480"
              height="360"
              loading="lazy"
            />
            <div>
              <p className="mt-3 group-hover:underline">{video.title}</p>
              <time dateTime={video.publishedAt} className="text-xs">
                {new Intl.DateTimeFormat('ja-JP').format(
                  new Date(video.publishedAt)
                )}
              </time>
            </div>
          </a>
        </Link>
      ))}
    </AdminLayout>
  );
};

export default AdminVideosPage;
