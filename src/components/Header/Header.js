import React, { useState, useContext } from 'react';
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ReactComponent as LogoutIcon } from '../../images/logout.svg';
import './Header.css';

export default function Header({ onLogin, onLogout, mode = 'light' }) {
  const [ opened, setOpened ] = useState(false);
  const user = useContext(CurrentUserContext);
  const loggedIn = !!user;

  return (
    <header className={ `header header_${ mode } ${opened ? 'header_opened' : ''}` }>
      <div className='header__container container'>
        <a className='header__logo' href="/">NewsExplorer</a>

        <div className='header__navigation'>
          <Navigation />
          <button
            className='header__button'
            onClick={()  => {
              if (loggedIn) {
                onLogout();
              } else {
                setOpened(false);
                onLogin();
              }
            }}
          >
            { loggedIn ? user.name : 'Авторизоваться'}
            { loggedIn &&  <LogoutIcon className='header__button-icon' />}
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