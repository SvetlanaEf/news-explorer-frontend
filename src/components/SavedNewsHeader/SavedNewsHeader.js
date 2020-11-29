import React, { useContext } from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Plural } from "../../utils/helpers";

const pluralPhrases = [
  'сохраненная статья',
  'сохраненные статьи',
  'сохраненных статей'
];
const pluralTags = [
  '-м другим',
  '-м другим',
  '-ю другими'
];

export default function SavedNewsHeader({ keywords = [], countNews = 0 }) {
  const firstWords = keywords.slice(0, 2);
  const otherWords = keywords.slice(2);
  const user = useContext(CurrentUserContext);

  return (
    <div className='saved-news-header'>
      <div className='saved-news-header__container container'>
        <p className='saved-news-header__pretitle'>Сохранённые статьи</p>
        { user && (
          <h1 className='saved-news-header__title'>
            { user.name }, у вас { !countNews ? 'пока нет сохраненных статей' : Plural(countNews, pluralPhrases) }
          </h1>
        ) }
        { !!keywords.length && (
          <p className='saved-news-header__tags'>
            По ключевым словам: <b>{ firstWords.join(', ') }</b>
            { !!otherWords.length && ' и ' }
            { !!otherWords.length && <b>{ Plural(otherWords.length, pluralTags, false) }</b> }
          </p>
        ) }
      </div>
    </div>
  );
}