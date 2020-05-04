import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiX } from 'react-icons/fi';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

import FirebaseService from '../../services/firebase-service';
import { Alert, TimePicker } from '../components';

import './styles.css';
import { toast } from 'react-toastify';

const errorMessage = {
  isSameOrAfter: 'The start time must be before the end time!',
  isBetween: 'Break time must be between the check-in and check-out times!',
};

const TimeRegister = () => {
  const [breakTimes, setBreakTimes] = useState([]);
  const [workTime, setworkTime] = useState({ start: '00:00', end: '01:00' });
  const [workingHours, setWorkingHours] = useState('0h');
  const [registerDate, setRegisterDate] = useState(
    moment().format('YYYY-MM-DD')
  );
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const updateRegisterDate = (e) => {
    setRegisterDate(moment(e.target.value).format('YYYY-MM-DD'));
  };

  const addBreakTime = () => {
    setBreakTimes([
      ...breakTimes,
      { id: uuid(), start: '00:00', end: '01:00' },
    ]);
  };

  const removeBreakTime = (id) => {
    setBreakTimes(breakTimes.filter((bt) => bt.id !== id));
  };

  const updateBreakTime = (index, field) => (e) => {
    const newBreakTimes = [...breakTimes];

    newBreakTimes[index][field] = e.target.value;

    setBreakTimes(newBreakTimes);
  };

  const updateWorkTime = (field) => (e) => {
    const newWorkTime = { ...workTime };

    newWorkTime[field] = e.target.value;

    setworkTime(newWorkTime);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerObj = {
      registerDate,
      breakTimes,
      workTime,
      workingHours,
    };

    try {
      await FirebaseService.saveWorkingTime(registerObj);
      toast.success('Saved successfully!');
      history.push('/home');
    } catch (error) {
      toast.error(error?.message || error);
    }
  };

  useEffect(() => {
    const updateWorkingHours = () => {
      const start = moment(workTime.start, 'HH:mm');
      const end = moment(workTime.end, 'HH:mm');

      const diff = end.diff(start, 'm');

      const breakTime = breakTimes.reduce(
        (previous, bt) =>
          previous +
          moment(bt.end, 'HH:mm').diff(moment(bt.start, 'HH:mm'), 'm'),
        0
      );

      const duration = moment
        .utc()
        .startOf('day')
        .add(diff - breakTime, 'm');

      const formatedHours = `${duration.format('H')}h${
        duration.minutes() ? duration.format('mm') : ''
      }`;

      setWorkingHours(formatedHours);
    };

    const validateFields = () => {
      const start = moment(workTime.start, 'HH:mm');
      const end = moment(workTime.end, 'HH:mm');
      let validateErrors = {};

      if (start.isSameOrAfter(end)) {
        validateErrors['isSameOrAfter'] = true;
      }

      breakTimes.forEach((bt) => {
        const btStart = moment(bt.start, 'HH:mm');
        const btEnd = moment(bt.end, 'HH:mm');

        if (btStart.isSameOrAfter(btEnd)) {
          validateErrors[bt.id] = { isSameOrAfter: true };
        }

        if (!btStart.isBetween(start, end) || !btEnd.isBetween(start, end)) {
          validateErrors[bt.id] = { ...validateErrors[bt.id], isBetween: true };
        }
      });

      setErrors(validateErrors);
      return !Object.keys(validateErrors).length;
    };

    const isValid = validateFields();

    console.log(isValid);

    if (isValid) {
      updateWorkingHours();
    } else {
      setWorkingHours('0h');
    }
  }, [breakTimes, workTime]);

  return (
    <div className="time-register-container">
      <div className="content">
        <section>
          <h1>Register Time</h1>
          <Link to="/home" className="link">
            <FiArrowLeft size={28} />
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <div className="register-date">
            <span>Date</span>
            <input
              type="date"
              value={registerDate}
              onChange={updateRegisterDate}
              required
            />
          </div>
          <div className="input-group">
            <TimePicker
              label="Check-in"
              value={workTime.start}
              onChange={updateWorkTime('start')}
              required
            />
            <TimePicker
              label="Check-out"
              value={workTime.end}
              onChange={updateWorkTime('end')}
              required
            />
          </div>
          <Alert message={errors.isSameOrAfter && errorMessage.isSameOrAfter} />
          <div className="break-time">
            <h3>Register break time</h3>
            <button className="button" type="button" onClick={addBreakTime}>
              <FiPlus size={18} color="#000" />
            </button>
          </div>
          <div className="break-time-list">
            {breakTimes.map((bt, index) => (
              <div key={bt.id} className="break-time">
                <div className="input-group">
                  <TimePicker
                    label="Start time"
                    value={bt.start}
                    onChange={updateBreakTime(index, 'start')}
                    required
                  />
                  <TimePicker
                    label="End time"
                    value={bt.end}
                    onChange={updateBreakTime(index, 'end')}
                    required
                  />
                  <button
                    className="button"
                    type="button"
                    onClick={() => removeBreakTime(bt.id)}
                  >
                    <FiX size={18} color="#E02041" />
                  </button>
                </div>
                <Alert
                  message={errors[bt.id]?.isBetween && errorMessage.isBetween}
                />
                <Alert
                  message={
                    errors[bt.id]?.isSameOrAfter && errorMessage.isSameOrAfter
                  }
                />
              </div>
            ))}
          </div>
          <div className="expected-working-hours">
            <strong>Expected working hours:</strong>
            <span>8h</span>
          </div>
          <div className="total-working-hours">
            <strong>Total:</strong>
            <span>{workingHours}</span>
          </div>
          <button className="button" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default TimeRegister;
