import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from 'Context/AuthContext';

const Layout = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      {!user || user === null ? (
        <Navigate to="/" state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}{' '}
    </React.Fragment>
  );
};

export default Layout;
