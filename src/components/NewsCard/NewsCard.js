import React, { useContext, useRef } from 'react';
import { ReactComponent as BookmarkIcon } from '../../images/bookmark-icon.svg';
import { ReactComponent as DeleteIcon } from '../../images/delete-icon.svg';
import defaultImage from '../../images/default-image.png';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { FORM_TYPE } from "../AuthPopup/AuthPopup";
import './NewsCard.css';

export default function NewsCard({ data, onSave = () => {}, onDelete = () => {} }) {
  const date = new Date(data.date);
  const user = useContext(CurrentUserContext);
  const isOwn = user && data.owner === user._id;
  const buttonRef = useRef(null)
  const handleSave = () => {
    onSave(data);
  };
  const handleDelete = () => {
    onDelete(data);
  };
  const handleClick = (e) => {
      if (buttonRef && buttonRef.current.contains(e.target)) {
        e.preventDefault();
      }
  }
  const handleSignUp = () => {
    window.location.hash = FORM_TYPE.SIGN_UP;
  };
  const handleSaveClick = () => {
    if (!user) {
      return handleSignUp();
    }

    return  isOwn ? handleDelete() : handleSave();
  };
  const buttonLabel = isOwn
    ? 'Убрать из сохранённых'
    : !user
      ? 'Войдите, чтобы сохранять статьи'
      : '';
  const buttonClasses = ['news-card__button'];

  if (data.saved) buttonClasses.push('news-card__button_active');
  if (buttonLabel) buttonClasses.push('news-card__button_label')

  return (
    <article className='news-card'>
      <a
        className='news-card__link'
        href={ data.link }
        target='_blank'
        rel='noreferrer'
        onClick={ handleClick }
      >
        <div className='news-card__head' style={{ backgroundImage: `url(${ data.image || defaultImage })` }}>
          { data.keyword && <div className='news-card__tag'>{ data.keyword }</div> }
          <button
            ref={buttonRef}
            className={buttonClasses.join(' ')}
            data-label={ buttonLabel }
            onClick={ handleSaveClick }
          >
            { isOwn
              ? <DeleteIcon className='news-card__button-icon news-card__button-icon_delete' />
              : <BookmarkIcon className='news-card__button-icon news-card__button-icon_bookmark' />
            }
          </button>
        </div>

        <div className='news-card__body'>
          <p className='news-card__date'>
            { date.toLocaleDateString('ru', { day: 'numeric', month: 'long' }) }, { date.getFullYear() }
          </p>
          <h2 className='news-card__title'>{ data.title }</h2>
          {data.text && <p className='news-card__text'>{ data.text }</p>}
          <p className='news-card__source'>{ data.source }</p>
        </div>
      </a>
    </article>
  )
}