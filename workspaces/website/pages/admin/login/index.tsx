import React, { FC } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';

type Props = {
  className?: string;
};

const AdminLoginPage: FC<Props> = ({ className }) => {
  return (
    <div className={cn(styles.adminLoginPage, className)}>
      <div className={styles.container}>sign-in page</div>
    </div>
  );
};

export default AdminLoginPage;
