import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/auth';
import Routes from './routes';

import './global.css';

toast.configure({
  position: 'top-right',
  autoClose: 5000,
});

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
