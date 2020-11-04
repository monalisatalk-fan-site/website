import React, { FC } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faChild } from '@fortawesome/free-solid-svg-icons';

type Props = {
  isLoggedIn: boolean | null;
  signOut(): void;
};

const menuItems = [
  { href: '/admin/videos', icon: faPlayCircle, label: 'Videos' },
  { href: '/admin/characters', icon: faChild, label: 'Characters' },
];

export const AdminSidebar: FC<Props> = ({ isLoggedIn, signOut }) => {
  return (
    <div className="relative w-0 h-full overflow-y-auto bg-gray-400 sm:w-auto">
      <div className="flex flex-col w-64 max-w-full min-h-full pb-4">
        <img
          alt=""
          src="//placehold.jp/320x240.png"
          width="320"
          height="240"
          className="flex-shrink-0 mb-4"
        />
        {isLoggedIn ? (
          <div className="flex flex-col flex-grow">
            {menuItems.map(({ href, icon, label }) => (
              <Link href={href} key={href}>
                <a className="flex items-center w-full px-5 py-3 mb-2 text-sm text-gray-800 hover:text-blue-600">
                  <FontAwesomeIcon
                    icon={icon}
                    fixedWidth
                    className="mr-2 text-xl"
                  />
                  {label}
                </a>
              </Link>
            ))}
            <div className="mt-auto">
              <button
                className="table py-2 mx-auto mt-10 text-sm text-center text-red-500 hover:underline"
                onClick={signOut}
              >
                ログアウト
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
