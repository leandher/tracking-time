import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <span>Bem vindo!</span>
        <Link className="button" to="/time-register">Registrar horas</Link>
        <button type="button">
          <FiPower size={18} />
        </button>
      </header>
    </div>
  );
};

export default Home;
