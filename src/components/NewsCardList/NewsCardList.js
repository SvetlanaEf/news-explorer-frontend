import React, { useState } from 'react';
import NewsCard from "../NewsCard/NewsCard";
import './NewsCardList.css';

export default function NewsCardList({ cards = [], withPagination = false, onDelete }) {
  const [ countShowing, setCountShowing ] = useState(3);
  const articles = withPagination ? cards.slice(0, countShowing) : cards;

  return (
    <div className='news-card-list container'>
      <div className='news-card-list__grid'>
        {articles.map((card, cardIndex) => (
          <NewsCard
            key={ cardIndex }
            data={ card }
            onDelete={ onDelete }
          />
        ))}
      </div>

      {withPagination && countShowing < cards.length && (
        <button
          className='news-card-list__show-more-button'
          onClick={() => setCountShowing(countShowing + 3)}
        >Показать еще</button>
      )}
    </div>
  );
}
