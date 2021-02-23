import React, { useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useLink, AriaLinkOptions } from '@react-aria/link';
import styles from '../UIButton/index.module.css';

export type Props = AriaLinkOptions & {
  className?: string;
  href: string;
  target?: string;
};

export const UILinkButton: React.FC<Props> = ({ className, ...props }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const { linkProps } = useLink(props, ref);

  return (
    <Link href={props.href}>
      <a
        {...linkProps}
        ref={ref}
        className={clsx(styles.uiButton, className)}
        target={props.target}
      >
        <span className={styles.text}>{props.children}</span>
      </a>
    </Link>
  );
};
