import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './Context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { AxiosInterceptor } from './Helper/api_helper';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.Fragment>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AuthContextProvider>
          <AxiosInterceptor>
            <App />
          </AxiosInterceptor>
        </AuthContextProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.Fragment>,
);
