import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import FirebaseService from '../../services/firebase-service';

import './styles.css';


const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const history = useHistory();

  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      name,
      password,
      email,
    };

    FirebaseService.createUser(data).then(() => {
      history.push('/');
    }).catch(() => {

    });
  };
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
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
