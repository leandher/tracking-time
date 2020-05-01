import React from 'react';

import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

const TimeRegister = () => {
  return (
    <div className="time-register-container">
      <div className="content">
        <section>
          <h1>Registrar horas</h1>
          <Link to="/home" className="link">
            <FiArrowLeft size={16} />
            Voltar para home
          </Link>
        </section>
        <form>
          <input placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default TimeRegister;
