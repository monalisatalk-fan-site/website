import React, { FC } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';

type Props = {
  className?: string;
};

const AdminPage: FC<Props> = ({ className }) => {
  return (
    <div className={cn(styles.adminPage, className)}>
      <p>admin top page !</p>
    </div>
  );
};

export default AdminPage;
