import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews'
import Footer from "../Footer/Footer";
import AuthPopup, { FORM_TYPE } from "../AuthPopup/AuthPopup";
import './App.css';
import Popup from "../Popup/Popup";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [ user, setUser ] = useState(null);
  const [ inProgress, setInProgress ] = useState(false);
  const [ openedForm, setOpenedForm ] = useState(null);
  const [ openSuccessPopup, setOpenSuccessPopup ] = useState(false);
  const [ authError, setAuthError ] = useState('');
  const [ storageArticles, setStorageArticles ] = useState([]);
  const history = useHistory();

  const handleSignIn = (form) => {
    setAuthError('');
    setInProgress(true);
    mainApi.signIn(form)
      .then(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          getCurrentUser();
          closeAllPopup();
        }
      })
      .catch(handleAuthError)
      .finally(() => setInProgress(false));
  };
  const handleSignUp = (form) => {
    setAuthError('');
    setInProgress(true);
    mainApi.signUp(form)
      .then(() => {
        closeAllPopup();
        setOpenSuccessPopup(true);
      })
      .catch(handleAuthError)
      .finally(() => setInProgress(false));
  };
  const handleLogin = () => {
    window.location.hash = FORM_TYPE.SIGN_IN;
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
  const checkHashChange = () => {
    const isOpenSignIn = window.location.hash.includes(FORM_TYPE.SIGN_IN) && openedForm !== FORM_TYPE.SIGN_IN;
    const isOpenSignUp = window.location.hash.includes(FORM_TYPE.SIGN_UP) && openedForm !== FORM_TYPE.SIGN_UP;
    const opened = isOpenSignIn
      ? FORM_TYPE.SIGN_IN
      : isOpenSignUp
        ? FORM_TYPE.SIGN_UP
        : null;

    setOpenedForm(opened);
  }
  const closeAllPopup = () => {
    window.location.hash = '';
  };

  useEffect(getCurrentUser, []);

  useEffect(() => {
    checkHashChange();
    window.addEventListener('hashchange', checkHashChange);

    try {
      let articles = localStorage.getItem('articles');

      if (articles) {
        articles = JSON.parse(articles);
        setStorageArticles(articles);
      }
    } catch (e) {
      console.error(e)
    }

    return () => window.removeEventListener('hashchange', checkHashChange);
  }, []);

  return (
    <CurrentUserContext.Provider value={ user }>
      <Switch>
        <ProtectedRoute path='/saved-news' loggedIn={ !!user } onRedirect={ handleLogin } >
          <SavedNews
            onLogin={ handleLogin }
            onLogout={ handleLogout }
          />
        </ProtectedRoute>
        <Route path='/'>
          <Main
            storageArticles={ storageArticles }
            onLogin={ handleLogin }
            onLogout={ handleLogout }
          />
        </Route>
      </Switch>

      <Footer/>

      <AuthPopup
        isOpen={ !!openedForm }
        inProgress={ inProgress }
        formType={ openedForm }
        onClose={ closeAllPopup }
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
