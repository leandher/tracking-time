import React from 'react';

import './styles.css';

const TimePicker = ({label, value, onChange, ...rest}) => (
  <div>
    <span>{label}</span>
    <input {...rest} type="time" value={value} onChange={onChange} />
</div>
);

export default TimePicker;
