import React from 'react';

import './styles.css';

const TimePicker = ({label, value, onChange}) => (
  <div>
    <span>{label}</span>
    <input type="time" value={value} onChange={onChange} />
</div>
);

export default TimePicker;
