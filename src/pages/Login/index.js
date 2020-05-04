import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import { useAuth } from '../../contexts/auth';

import './styles.css';

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    await login({ email, password });
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">
            Sign in
          </button>
          <Link to="/register" className="link">
            <FiLogIn size={16} />
            Sign up
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
