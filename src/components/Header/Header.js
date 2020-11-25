import React, { useState } from 'react';
import Navigation from "../Navigation/Navigation";
import './Header.css';

export default function Header({ onLogin, onLogout, mode = 'light' }) {
  const [ opened, setOpened ] = useState(false);

  return (
    <header className={ `header header_${ mode } ${opened ? 'header_opened' : ''}` }>
      <div className='header__container container'>
        <a className='header__logo' href="/">NewsExplorer</a>

        <div className='header__navigation'>
          <Navigation/>
          <button
            className='header__button'
            onClick={()  => {
              setOpened(false);
              onLogin();
            }}
          >Авторизоваться
          </button>
        </div>

        <button
          className='header__burger'
          onClick={() => setOpened(!opened)}
        />
      </div>

      <div className='header__overlay' onClick={() => setOpened(false)} />
    </header>
  );
}