import React, { FC } from 'react';
import { AdminLayout } from '@/components/AdminLayout';

const AdminPage: FC = () => {
  return (
    <AdminLayout>
      <div>
        <p className="text-red-300">admin top page !</p>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
