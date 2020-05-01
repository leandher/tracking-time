import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

const Login = () => {
  return (
    <div className="login-container">
      <section className="form">
        <form>
          <h1>Login</h1>
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha"/>
          <button className="button" type="submit">
            Entrar
          </button>
          <Link to="/register" className="link">
            <FiLogIn size={16} />
            Cadastrar
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
