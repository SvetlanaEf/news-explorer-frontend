import React, { useState } from 'react';
import './Input.css';

export default function Input({ name, value, onChange, label, type = 'text', placeholder }) {
  const [ error, setError ] = useState('');

  return (
    <label className='input'>
      <span className='input__label'>{ label }</span>
      <input
        className='input__field'
        placeholder={ placeholder }
        type={ type }
        value={ value }
        onChange={ onChange }
        name={ name }
      />
      { error && <span className='input__error'>{ error }</span> }
    </label>
  );
}