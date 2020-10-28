import React, { FC } from 'react';
import cn from 'classnames';
import { AdminAuth } from '@/components/AdminAuth';
import styles from './index.module.scss';

type Props = {
  className?: string;
};

const AdminPage: FC<Props> = ({ className }) => {
  return (
    <AdminAuth>
      <div className={cn(styles.adminPage, className)}>
        <p>admin top page !</p>
      </div>
    </AdminAuth>
  );
};

export default AdminPage;
