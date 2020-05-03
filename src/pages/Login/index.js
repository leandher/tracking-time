import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import FirebaseService from '../../services/firebase-service';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    FirebaseService.login({ email, password })
      .then(async (resp) => {
        const token = await resp.getIdToken();
        localStorage.setItem('authenticationToken', token);
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            name: resp.displayName,
            email: resp.email,
            id: resp.uid,
          })
        );

        history.push('/home');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="login-container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
