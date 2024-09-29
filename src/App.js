import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './AllRoutes';
import { ToastContainer } from 'react-toastify';;

function App() {
  return (
    <React.Fragment>
      <AllRoutes />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
