import React, { useState } from 'react';
import Header from "../Header/Header";
import './Main.css';
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import { articles } from './mockup.data';
import Preloader from "../Preloader/Preloader";

export default function Main({ onLogin, onLogout }) {
  const [ inProgress, setInProgress ] = useState(false);
  const [ cards, setCards ] = useState([]);
  const handleSearch = (value) => {
    if (!value) return;

    setInProgress(true);

    setTimeout(() => {
      setInProgress(false);
      setCards(articles.map((item) => ({
        keyword: '',
        source: item.source.name,
        title: item.title,
        text: item.description,
        date: item.publishedAt,
        image: item.urlToImage,
        link: item.url
      })));
    }, 3000);
  };

  return (
    <div className='main'>
      <div className='main__header'>
        <Header onLogin={ onLogin } onLogout={ onLogout }/>

        <div className='main__search'>
          <h1 className='main__heading'>Что творится в мире?</h1>
          <p className='main__description'>
            Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
          </p>
          <SearchForm onSubmit={ handleSearch }/>
        </div>
      </div>

      { (inProgress || !!cards.length) && (
        <section className='main__news-container'>
          { !!cards.length && (
            <div className='container'>
              <h2 className='main__news-title'>Результаты поиска</h2>
            </div>
          )}

          { !!cards.length && (
              <NewsCardList
                cards={ cards }
                withPagination
              />
          ) }

          { inProgress && <Preloader text='Идет поиск новостей...'/> }
        </section>
      ) }
      <About/>

    </div>
  )
}
