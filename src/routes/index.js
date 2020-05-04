import React from 'react';

import { useAuth } from '../contexts/auth';
import { Spinner } from '../pages/components';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const { signed, isLoading } = useAuth();

  if (isLoading) return <Spinner isLoading={isLoading} />;

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
