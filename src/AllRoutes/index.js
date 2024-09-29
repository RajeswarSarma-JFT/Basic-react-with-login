import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { SuperAdminRoutes, ProtectedRoutes } from './ProtectedRoutes';
const VerticalLayout = lazy(() => import('../Layouts/index'));
// const PageNotFound = lazy(() => import('Pages/Errors/PageNotFound'));
const AuthLayouts = lazy(() => import('../Layouts/AuthLayouts'));

const AllRoutes = () => (
  <React.Fragment>
    <Routes>
      <Route
        element={
          <Suspense>
            <AuthLayouts />
          </Suspense>
        }
      >
        <Route exact path="/">
          {PublicRoutes.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
        </Route>
      </Route>
      <Route
        element={
          <Suspense>
            <VerticalLayout />
          </Suspense>
        }
      >
        
        <Route exact path="/">
          {ProtectedRoutes.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
        </Route>
        <Route exact path="/superadmin">
          {SuperAdminRoutes.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
        </Route>
      </Route>
      {/* <Route
        path="*"
        element={
          <Suspense>
            <PageNotFound />
          </Suspense>
        }
      /> */}
    </Routes>
  </React.Fragment>
);

export default AllRoutes;
