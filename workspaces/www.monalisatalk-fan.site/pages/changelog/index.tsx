import React from 'react';
import { GetStaticProps } from 'next';
import type resources from '~/assets/data/resources.json';

type StaticProps = {
  changelogs: Array<{
    date: string;
    items: Array<{
      title: string;
      category: string;
      description: string;
    }>;
    video: typeof resources['videos'][number] | null;
  }>;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const fs = await import('fs');
  const path = await import('path');
  const fg = await import('fast-glob');
  const yaml = await import('js-yaml');
  const resources = await import('~/assets/data/resources.json');

  const files = fg.sync(
    path.join(process.cwd(), 'assets/data/changelogs/*.yml')
  );
  const changelogs = await Promise.all(
    files.map(async (filePath) => {
      const file = await fs.promises.readFile(filePath, 'utf-8');
      const date = path.basename(filePath, path.extname(filePath));
      const data = yaml.load(file);

      if (!Array.isArray(data)) {
        return;
      }

      const video = resources.videos.find(({ publishedAt }) => {
        const instance = new Date(publishedAt);
        const timezoneOffset = instance.getTimezoneOffset();
        const hoursDiff = Math.round((-540 - timezoneOffset) / 60);

        instance.setHours(instance.getHours() + hoursDiff);

        const y = instance.getFullYear();
        const m = instance.getMonth() + 1;
        const d = instance.getDate();

        const formattedDate = [
          y,
          `${m}`.padStart(2, '0'),
          `${d}`.padStart(2, '0'),
        ].join('-');

        console.log(formattedDate, date);

        return formattedDate === date;
      });

      return {
        date,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: data as any,
        video: video || null,
      };
    })
  );

  return {
    props: {
      changelogs: changelogs
        .filter((item): item is NonNullable<typeof item> => item != null)
        .reverse(),
    },
  };
};

const ChangelogPage: React.VFC<StaticProps> = ({ changelogs }) => {
  return (
    <div>
      <pre>{JSON.stringify(changelogs, null, '  ')}</pre>
    </div>
  );
};

export default ChangelogPage;
