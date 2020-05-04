import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import FirebaseService from '../../services/firebase-service';

import './styles.css';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      name,
      password,
      email,
    };

    try {
      await FirebaseService.createUser(data);
      history.push('/');
    } catch (error) {
      toast.error(error?.message || error);
    }
  };
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1>Sign up</h1>
          <Link to="/" className="link">
            <FiArrowLeft size={16} />
            Sign in
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Name"
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
