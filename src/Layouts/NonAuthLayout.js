import React, { useEffect } from 'react';

const NonAuthLayout = ({ children }) => {
  useEffect(() => {
    document.body.setAttribute('data-layout-mode', 'light');
    return () => {
      document.body.removeAttribute('data-layout-mode');
    };
  }, []);
  return <div>{children}</div>;
};

export default NonAuthLayout;
