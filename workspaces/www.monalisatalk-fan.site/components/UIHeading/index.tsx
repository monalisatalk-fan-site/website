import React from 'react';
import styles from './index.module.css';

export type Props = {
  title: string;
  description?: string;
};

export const UIHeading: React.VFC<Props> = ({ title, description }) => (
  <div className={styles.uiHeading}>
    <h1 className={styles.title}>{title}</h1>
    {description ? <p className={styles.description}>{description}</p> : null}
  </div>
);
