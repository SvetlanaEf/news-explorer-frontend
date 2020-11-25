import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Navigation.css';

function Navigation({ location }) {
  const links = [
    {
      label: 'Главная',
      link: '/',
      active: location.pathname === '/'
    },
    {
      label: 'Сохраненные статьи',
      link: '/saved-news',
      active: location.pathname === '/saved-news'
    }
  ]

  return (
    <nav className='navigation'>
      { links.map((item, itemIndex) => (
        <Link
          key={ itemIndex }
          className={`navigation__item ${item.active ? 'navigation__item_active' : ''}`}
          to={ item.link }
        >{ item.label }</Link>
      )) }
    </nav>
  );
}

export default withRouter(Navigation);
