import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

import './styles.css';

const Alert = ({ message }) => {
  return !!message ? (
    <div className="alert">
      <FiAlertTriangle size={18} color="#ffc107" />
      <span>{message}</span>
    </div>
  ) : (
    <></>
  );
};

export default Alert;
