import React from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin: calc(100vh - 50%) auto;
  border-color: red;
`;

const Spinner = ({ isLoading }) => {
  return (
    <ClipLoader css={override} size={50} color="#E02041" loading={isLoading} />
  );
};

export default Spinner;
