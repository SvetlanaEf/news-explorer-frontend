import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews'
import Footer from "../Footer/Footer";
import AuthPopup from "../AuthPopup/AuthPopup";
import './App.css';
import Popup from "../Popup/Popup";
import mainApi from "../../utils/MainApi";

function App() {
  const [ user, setUser ] = useState(null);
  const [ openAuthPopup, setOpenAuthPopup ] = useState(false);
  const [ openSuccessPopup, setOpenSuccessPopup ] = useState(false);
  const [ authError, setAuthError ] = useState('');
  const history = useHistory();

  const handleSignIn = (form) => {
    setAuthError('');
    mainApi.signIn(form)
      .then(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          getCurrentUser();
          setOpenAuthPopup(false);
        }
      })
      .catch(handleAuthError);
  };
  const handleSignUp = (form) => {
    setAuthError('');
    mainApi.signUp(form)
      .then(() => {
        setOpenAuthPopup(false);
        setOpenSuccessPopup(true);
      })
      .catch(handleAuthError)
  };
  const handleLogin = () => {
    setOpenAuthPopup(true);
  }
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    history.push('/');
  };
  const handleAuthError = (error) => {
    if (error && error.message) {
      setAuthError(error.message);
    }
  };
  const getCurrentUser = () => {
    if (!localStorage.getItem('token')) return;

    mainApi.getMe()
      .then(response => setUser(response.data))
      .catch(handleLogout);
  };

  useEffect(getCurrentUser, []);

  return (
    <CurrentUserContext.Provider value={ user }>
      <Switch>
        <Route path='/saved-news'>
          <SavedNews
            onLogin={ handleLogin }
            onLogout={ handleLogout }
          />
        </Route>
        <Route path='/'>
          <Main
            onLogin={ handleLogin }
            onLogout={ handleLogout }
          />
        </Route>
      </Switch>

      <Footer/>

      <AuthPopup
        isOpen={ openAuthPopup }
        onClose={ () => setOpenAuthPopup(false) }
        onSignIn={ handleSignIn }
        onSignUp={ handleSignUp }
        error={ authError }
      />

      <Popup
        title='Пользователь успешно зарегистрирован!'
        isOpen={ openSuccessPopup }
        onClose={ () => setOpenSuccessPopup(false) }
      >
        <button
          className='inline-button'
          onClick={ () => {
            setOpenSuccessPopup(false)
            handleLogin();
          } }
        >Войти</button>
      </Popup>
    </CurrentUserContext.Provider>
  );
}

export default App;
