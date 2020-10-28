import React, { FC } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';

type Props = {
  className?: string;
};

const NotFoundPage: FC<Props> = ({ className }) => {
  return <div className={cn(styles.notFoundPage, className)}>404</div>;
};

export default NotFoundPage;
