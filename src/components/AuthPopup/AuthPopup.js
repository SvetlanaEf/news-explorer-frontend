import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Input from "../Input/Input";
import './AuthPopup.css';

const FORM_TYPE = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up'
}

export default function AuthPopup({ onSignIn, onSignUp, isOpen, onClose, error }) {
  const [ formType, setFormType ] = useState(FORM_TYPE.SIGN_IN);
  const [ validate, setValidate ] = useState({});
  const [ formValues, setFormValues ] = useState({});
  const isSignIn = useMemo(() => formType === FORM_TYPE.SIGN_IN, [ formType ]);
  const isSignUp = useMemo(() => formType === FORM_TYPE.SIGN_UP, [ formType ]);
  const isValidate = useMemo(() => {
    return Object.keys(validate).every(key => !!validate[key]);
  }, [ validate ]);
  const handleSubmit = () => {
    (isSignIn ? onSignIn : onSignUp)(formValues);
  };
  const handleToggleForm = () => {
    setFormType(formType === FORM_TYPE.SIGN_IN ? FORM_TYPE.SIGN_UP : FORM_TYPE.SIGN_IN);
  }
  const handleValidate = useCallback((name, isValid) => {
    setValidate(prev => ({ ...prev, [name]: isValid }));
  }, [ setValidate ]);
  const handleChange = useCallback((name, value) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  }, [ setFormValues ]);

  useEffect(() => {
    setFormType(FORM_TYPE.SIGN_IN);
  }, [ isOpen ]);

  useEffect(() => {
    console.log('change form type')
    setFormValues({});
    setValidate({});
  }, [ formType ]);

  return (
    <PopupWithForm
      className='auth-popup'
      title={ isSignIn ? 'Вход' : 'Регистрация' }
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    >
      <Input
        className='auth-popup__field'
        type='email'
        label='Email'
        placeholder='Введите почту'
        required
        name='email'
        onValidate={ handleValidate }
        onChange={ handleChange }
        value={ formValues.email || '' }
      />

      <Input
        className='auth-popup__field'
        type='password'
        label='Пароль'
        placeholder='Введите пароль'
        minLength={ 8 }
        required
        name='password'
        onValidate={ handleValidate }
        onChange={ handleChange }
        value={ formValues.password || '' }
      />

      <Input
        className='auth-popup__field'
        label='Имя'
        placeholder='Введите своё имя'
        minLength={ 2 }
        maxLength={ 40 }
        required
        name='name'
        onValidate={ handleValidate }
        onChange={ handleChange }
        visible={ isSignUp }
        value={ formValues.name || '' }
      />

      { error && <p className='auth-popup__error'>{ error }</p> }
      <button
        className='auth-popup__submit'
        disabled={ !isValidate }
        type='submit'
      >{ isSignIn ? 'Войти' : 'Зарегистрироваться' }</button>

      <div className='auth-popup__toggle'>
        <span className='auth-popup__toggle-text'>или <button
          className='inline-button'
          onClick={ handleToggleForm }
          type='button'
        >{ isSignIn ? 'Зарегистрироваться' : 'Войти' }</button></span>
      </div>
    </PopupWithForm>
  )
}