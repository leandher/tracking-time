import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiX } from 'react-icons/fi';
import { v4 as uuid } from 'uuid';

import { TimePicker } from '../components';

import './styles.css';
import moment from 'moment';

const TimeRegister = () => {
  const [breakTimes, setBreakTimes] = useState([]);
  const [workTime, setworkTime] = useState({ start: '08:00', end: '18:00' });
  const [workingHours, setWorkingHours] = useState(0);

  const addBreakTime = () => {
    setBreakTimes([...breakTimes, { id: uuid(), start: '00:00', end: '00:00' }]);
  };

  const removeBreakTime = (id) => {
    setBreakTimes(breakTimes.filter((bt) => bt.id !== id));
  };

  const updateBreakTime = (index, field) => e => {
    const newBreakTimes = [...breakTimes];

    newBreakTimes[index][field] = e.target.value;

    setBreakTimes(newBreakTimes);
  }

  const updateWorkTime = (field) => e => {
    const newWorkTime = {...workTime};

    newWorkTime[field] = e.target.value;

    setworkTime(newWorkTime);
  }

  const updateWorkingHours = () => {
    const start = moment(workTime.start);
    const end = moment(workTime.end);

    console.log(start, end);
  }

  useEffect(updateWorkingHours, [breakTimes, updateWorkingHours]);

  return (
    <div className="time-register-container">
      <div className="content">
        <section>
          <h1>Registrar horas</h1>
          <Link to="/home" className="link">
            <FiArrowLeft size={28} />
          </Link>
        </section>
        <form>
          <div className="input-group">
            <TimePicker label="Hora de entrada" value={workTime.start} onChange={updateWorkTime('start')} />
            <TimePicker label="Hora de saída" value={workTime.end} onChange={updateWorkTime('end')} />
          </div>
          <div className="break-time">
            <h3>Registrar pausas</h3>
            <button className="button" type="button" onClick={addBreakTime}>
              <FiPlus size={18} color="#000" />
            </button>
          </div>
          <div className="break-time-list">
            {breakTimes.map((bt, index) => (
              <div key={bt.id} className="input-group">
                <TimePicker label="Hora de entrada" value={bt.start} onChange={updateBreakTime(index, 'start')} />
                <TimePicker label="Hora de saída" value={bt.end} onChange={updateBreakTime(index, 'end')} />
                <button
                  className="button"
                  type="button"
                  onClick={() => removeBreakTime(bt.id)}
                >
                  <FiX size={18} color="#E02041" />
                </button>
              </div>
            ))}
          </div>
          <div className="expected-working-hours">
              <strong>Expectativa de horas trabalhadas:</strong>
              <span>8h</span>
          </div>
          <div className="total-working-hours">
              <strong>Total de horas trabalhadas:</strong>
              <span>{workingHours}h</span>
          </div>
          <button className="button" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default TimeRegister;
