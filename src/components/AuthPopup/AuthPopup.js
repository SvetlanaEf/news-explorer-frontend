import React, { useState } from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Input from "../Input/Input";
import './AuthPopup.css';

const FORM_TYPE = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up'
}

export default function AuthPopup({ onSignIn, onSignUp, isOpen, onClose }) {
  const [ formType, setFormType ] = useState(FORM_TYPE.SIGN_IN);
  const handleSubmit = (values) => {
    console.log(values);
    if (formType === FORM_TYPE.SIGN_IN) {
      onSignIn(values);
    } else {
      onSignUp(values);
    }
  };
  const handleToggleForm = () => {
      setFormType(formType === FORM_TYPE.SIGN_IN ? FORM_TYPE.SIGN_UP : FORM_TYPE.SIGN_IN);
  }

  return (
    <PopupWithForm
      className='auth-popup'
      title={ formType === FORM_TYPE.SIGN_IN ? 'Вход' : 'Регистрация' }
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    >
      <Input
        className='auth-popup__field'
        type='email'
        label='Email'
        placeholder='Введите почту'
      />

      <Input
        className='auth-popup__field'
        type='password'
        label='Пароль'
        placeholder='Введите пароль'
      />

      { formType === FORM_TYPE.SIGN_UP && (
        <Input
          className='auth-popup__field'
          label='Имя'
          placeholder='Введите своё имя'
        />
      ) }

      <button
        className='auth-popup__submit'
        disabled
        type='submit'
      >{ formType === FORM_TYPE.SIGN_IN ? 'Войти' : 'Зарегистрироваться' }</button>

      <div className='auth-popup__toggle'>
        <span className='auth-popup__toggle-text'>или <button
          className='auth-popup__toggle-button'
          onClick={ handleToggleForm }
        >{ formType === FORM_TYPE.SIGN_IN ? 'Зарегистрироваться' : 'Войти' }</button></span>
      </div>
    </PopupWithForm>
  )
}