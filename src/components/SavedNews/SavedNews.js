import React, { useState, useEffect } from 'react';
import { articles } from "./mockup.data";
import Header from "../Header/Header";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import './SavedNews.css';

export default function SavedNews({ onLogin, onLogout }) {
  const [ cards, setCards ] = useState([]);
  const [ inProgress, setInProgress ] = useState(true);

  const handleDeleteNews = (news) => {
    console.log('delete', news);
  }

  useEffect(() => {
    setTimeout(() => {
      setCards(articles);
      setInProgress(false);
    }, 2000);
  }, []);

  return (
    <div className='saved-news'>
      <Header
        onLogin={ onLogin }
        onLogout={ onLogout }
        mode='dark'
      />

      <SavedNewsHeader
        keywords={ cards.map(({ keyword }) => keyword) }
        countNews={ cards.length }
      />

      <section className='saved-news__cards'>
        <div className='saved-news__cards-grid'>
          <NewsCardList cards={ cards } onDelete={ handleDeleteNews } />
        </div>

        { inProgress && <Preloader text='Идет загрузка сохраненных статей...'/> }
      </section>
    </div>
  );
}