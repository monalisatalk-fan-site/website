import React from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

export type Props = {
  className?: string;
};

export const LayoutContainer: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={clsx(styles.layoutContainer, className)}>
      {children}
    </div>
  );
};
