import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import './SavedNews.css';
import mainApi from "../../utils/MainApi";
import { filterUnique } from "../../utils/helpers";
import ErrorPopup from "../ErrorPopup/ErrrorPopup";

export default function SavedNews({ onLogin, onLogout }) {
  const [ cards, setCards ] = useState([]);
  const [ inProgress, setInProgress ] = useState(true);
  const [ error, setError ] = useState('');

  const handleError = (error) => {
    if (error && error.message) {
      setError(error.message);
    }
  }
  const handleDeleteNews = (news) => {
    mainApi.deleteNews(news._id)
      .then(() => setCards(cards.filter(({ _id }) => _id !== news._id)))
      .catch(handleError);
  }

  useEffect(() => {
    mainApi.getSavedNews()
      .then(response => {
        if (response && response.data) {
          setCards(response.data);
        }
      })
      .catch(handleError)
      .finally(() => setInProgress(false));
  }, []);

  return (
    <div className='saved-news'>
      <Header
        onLogin={ onLogin }
        onLogout={ onLogout }
        mode='dark'
      />

      <SavedNewsHeader
        keywords={ cards.map(({ keyword }) => keyword).filter(filterUnique) }
        countNews={ cards.length }
      />

      { (inProgress || !!cards.length) && (
        <section className='saved-news__cards'>
          <div className='saved-news__cards-grid'>
            <NewsCardList cards={ cards } onDeleteCard={ handleDeleteNews } />
          </div>

          { inProgress && <Preloader text='Идет загрузка сохраненных статей...'/> }
        </section>
      ) }

      <ErrorPopup
        isOpen={ !!error }
        onClose={ () => setError('') }
      >{ error }</ErrorPopup>
    </div>
  );
}