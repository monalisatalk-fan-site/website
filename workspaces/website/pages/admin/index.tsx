import React, { FC } from 'react';
import cn from 'classnames';
import { AdminLayout } from '@/components/AdminLayout';
import styles from './index.module.scss';

type Props = {
  className?: string;
};

const AdminPage: FC<Props> = ({ className }) => {
  return (
    <AdminLayout>
      <div className={cn(styles.adminPage, className)}>
        <p>admin top page !</p>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
