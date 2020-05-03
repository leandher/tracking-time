import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import './styles.css';
import { useAuth } from '../../contexts/auth';

const Home = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  }
  return (
    <div className="home-container">
      <header>
        <span>Bem vindo!</span>
        <Link className="button" to="/time-register">Registrar horas</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} />
        </button>
      </header>
    </div>
  );
};

export default Home;
