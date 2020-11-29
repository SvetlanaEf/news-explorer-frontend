import React, { useState, useRef, useEffect } from 'react';
import './Input.css';

export default function Input({ label, onValidate, onChange, value, visible = true, ...props }) {
  const [ error, setError ] = useState('');
  const inputRef = useRef(null);
  const isValid = !!(inputRef && inputRef.current && inputRef.current.validity.valid);
  const handleChange = ({ target: { value } }) => {
    onChange(props.name, value);

    if (!inputRef || !inputRef.current) return;

    setError(!isValid ? inputRef.current.validationMessage : '');
  }

  useEffect(() => {
    onValidate(props.name, isValid);
  }, [ isValid, props.name, onValidate ]);

  useEffect(() => {
    onValidate(props.name, visible ? isValid : true);
  }, [ props.name, visible, onValidate, isValid ]);

  useEffect(() => {
    if (!value) {
      setError('');
    }
  }, [ value ])

  if (!visible) return null;

  return (
    <label className='input'>
      <span className='input__label'>{ label }</span>
      <input
        ref={ inputRef }
        { ...props }
        className='input__field'
        onChange={ handleChange }
        value={ value }
      />
      { error && <span className='input__error'>{ error }</span> }
    </label>
  );
}
