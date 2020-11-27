import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews'
import Footer from "../Footer/Footer";
import AuthPopup from "../AuthPopup/AuthPopup";
import './App.css';
import Popup from "../Popup/Popup";

function App() {
  const [ user, setUser ] = useState({
    _id: '12efc03ifjkfewpf2eogjdsv22fj',
    name: 'Светлана',
    email: 'ымуедфтф"нфюкг'
  });
  const [ openAuthPopup, setOpenAuthPopup ] = useState(false);
  const [ openSuccessPopup, setOpenSuccessPopup ] = useState(false);
  const handleSignIn = () => {

  };
  const handleSignUp = () => {
    setOpenSuccessPopup(true);
  };
  const handleLogin = () => {
    setOpenAuthPopup(true);
  }
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <CurrentUserContext.Provider value={ user }>
      <Router>
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
      </Router>
    </CurrentUserContext.Provider>
  );
}

export default App;
