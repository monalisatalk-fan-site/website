import React from 'react';
import clsx from 'clsx';
import { IconsId } from '~/types/iconfonts';

export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  icon: IconsId;
};

export const UIIcon: React.VFC<Props> = ({ icon, className, ...props }) => {
  return <i className={clsx(`icon-${icon}`, className)} {...props} />;
};
