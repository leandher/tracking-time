import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiPauseCircle } from 'react-icons/fi';

import { useAuth } from '../../contexts/auth';
import FirebaseService from '../../services/firebase-service';
import { Card, Spinner } from '../components';

import './styles.css';

const Home = () => {
  const {
    logout,
    user: { name },
  } = useAuth();
  const [workingTimeHistory, setWorkingTimeHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    await logout();
  };

  const getWorkingTimeHistory = async () => {
    const workingTimes = await FirebaseService.getWorkingTimeHistory();

    setWorkingTimeHistory(workingTimes);
    setIsLoading(false);
  };

  useEffect(() => {
    getWorkingTimeHistory();
  }, []);

  return (
    <div className="home-container">
      <header>
        <span>Welcome, {name}!</span>
        <Link className="button" to="/time-register">
          Register time
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} />
        </button>
      </header>
      <div className="list-history">
        {isLoading && <Spinner isLoading={isLoading} />}
        {workingTimeHistory.map((wth) => (
          <Card key={wth.id}>
            <div>
              <div>
                <div>
                  <strong>Date:</strong>
                  <span>{wth.registerDate}</span>
                </div>
                <div>
                  <strong>Check-in:</strong>
                  <span>{wth.workTime?.start}</span>
                </div>
                <div>
                  <strong>Check-out:</strong>
                  <span>{wth.workTime?.end}</span>
                </div>
                <div className="list-breaks">
                  {!!wth.breakTimes?.length && <strong>Breaks:</strong>}
                  <ul>
                    {wth.breakTimes.map((bt) => (
                      <li key={bt.id}>
                        <strong>
                          <FiPauseCircle size={18} />
                        </strong>
                        <span>{bt.start}</span>-<span>{bt.end}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <strong>Total / Expected:</strong>
              <span>{wth.workingHours} / 8h</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
