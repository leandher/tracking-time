import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

const Register = () => {
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1>Cadastro</h1>
          <Link to="/" className="link">
            <FiArrowLeft size={16} />
            Já tenho cadastro
          </Link>
        </section>
        <form>
          <input placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha"/>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
