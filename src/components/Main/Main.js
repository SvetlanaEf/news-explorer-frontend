import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import './Main.css';
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import newsApi from "../../utils/NewsApi";
import { ReactComponent as EmptyIcon } from '../../images/empty-icon.svg';
import mainApi from "../../utils/MainApi";
import ErrorPopup from "../ErrorPopup/ErrrorPopup";

export default function Main({ onLogin, onLogout, storageArticles }) {
  const [ inProgress, setInProgress ] = useState(false);
  const [ cards, setCards ] = useState([]);
  const [ isEmptyResponse, setIsEmptyResponse ] = useState(false);
  const [ error, setError ] = useState('');

  const handleError = (error) => {
    if (error && error.message) {
      setError(error.message);
    }
  }
  const handleSearch = (keyword) => {
    if (!keyword) return;

    localStorage.removeItem('articles');
    setCards([]);
    setIsEmptyResponse(false)
    setInProgress(true);
    newsApi
      .getEverything(keyword)
      .then((response => {
        if (response && response.status === 'ok') {
          if (response.totalResults) {
            const articles = response.articles.map((item) => ({
              keyword,
              source: item.source.name,
              title: item.title,
              text: item.description,
              date: item.publishedAt,
              image: item.urlToImage,
              link: item.url
            }));

            localStorage.setItem('articles', JSON.stringify(articles));
            setCards(articles);
          } else {
            setIsEmptyResponse(true);
          }
        }
      }))
      .catch(handleError)
      .finally(() => setInProgress(false));
  };
  const handleSaveCard = (card) => {
    mainApi.saveNews(card)
      .then(() => {
          setCards(cards.map(item => {
            if (item.link === card.link) {
              item.saved = true;
            }

            return item;
          }))
      })
      .catch(handleError)
  };

  useEffect(() => {
    if (storageArticles && storageArticles.length && !cards.length && !inProgress) {
      setCards(storageArticles);
    }
  }, [ storageArticles, cards ]);

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

      { (inProgress || !!cards.length || isEmptyResponse) && (
        <section className='main__news-container'>
          { !!cards.length && (
            <div className='container'>
              <h2 className='main__news-title'>Результаты поиска</h2>
            </div>
          )}

          { !!cards.length && (
              <NewsCardList
                cards={ cards }
                onSaveCard={ handleSaveCard }
                withPagination
              />
          ) }

          { inProgress && <Preloader text='Идет поиск новостей...'/> }

          { isEmptyResponse && (
            <div className='main__empty'>
              <EmptyIcon className='main__empty-icon' />
              <div className='main__empty-title'>Ничего не найдено</div>
              <p className='main__empty-description'>К сожалению по вашему запросу
                ничего не найдено.</p>
            </div>
          ) }
        </section>
      ) }
      <About/>

      <ErrorPopup
        isOpen={ !!error }
        onClose={ () => setError('') }
      >{ error }</ErrorPopup>
    </div>
  )
}
