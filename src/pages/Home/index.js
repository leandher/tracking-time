import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { logout } from '../../services/firebase-service';

import './styles.css';

const Home = () => {
  const history = useHistory();

  const handleLogout = () => {
    logout().then(() => {
      localStorage.setItem('userInfo', {});
      localStorage.setItem('authenticationToken', '');

      history.push('/');
    })
    .catch((error) => alert(error));
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
