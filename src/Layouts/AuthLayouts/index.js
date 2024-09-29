import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'Context/AuthContext';

const AuthLayouts = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if(user && !location.pathname.includes('change-password')){
      navigate('/dashboard')
    }
  }, [user, location]);
  return (
    <React.Fragment>
       <Outlet />
    </React.Fragment>
  );
};

export default AuthLayouts;