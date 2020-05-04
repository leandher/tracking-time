import React from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const override = css`
  display: block;
  margin: 50% auto;
  border-color: red;
`;

const Routes = () => {
  const { signed, isLoading } = useAuth();

  if (isLoading)
    return (
      <ClipLoader
        css={override}
        size={50}
        color="#E02041"
        loading={isLoading}
      />
    );

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
