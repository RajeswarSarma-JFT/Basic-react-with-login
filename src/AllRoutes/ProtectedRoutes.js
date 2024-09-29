import React, { lazy, Suspense } from 'react';

const SuperAdminDashboardMain = lazy(() => import('Pages/SuperAdmin/Dashboard'));
const Dashboard = lazy(() => import('Pages/Dashboard'));

const SuperAdminRoutes = [
  {
    path: 'dashboard',
    element: (
      <Suspense>
        <SuperAdminDashboardMain />
      </Suspense>
    ),
  }
];


const ProtectedRoutes = [
  {
    path: 'dashboard',
    element: (
      <Suspense>
        <Dashboard />
      </Suspense>
    ),
  }
];


export { ProtectedRoutes, SuperAdminRoutes };
