import React from 'react';
import gitHubIcon from '../../images/github.svg';
import facebookIcon from '../../images/facebook.svg';

import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__container container'>
        <p className='footer__copyrights'>© 2020 explorer-news.tk, Powered by News API</p>

        <div className='footer__links-container'>
          <ul className='footer__links'>
            <li className='footer__links-item'>
              <a className='footer__links-link' href="/">Главная</a>
            </li>
            <li className='footer__links-item'>
              <a
                className='footer__links-link'
                href="https://praktikum.yandex.ru/"
                target='_blank'
                rel='noreferrer'
              >Яндекс.Практикум</a>
            </li>
          </ul>
          <ul className='footer__social'>
            <li className='footer__social-item'>
              <a
                className='footer__social-link'
                href='https://github.com/SvetlanaEf/news-explorer-frontend'
                target='_blank'
                rel='noreferrer'
              >
                <img src={ gitHubIcon } alt="Ссылка на GitHub"/>
              </a>
            </li>
            <li className='footer__social-item'>
              <a
                className='footer__social-link'
                href='https://facebook.com'
                target='_blank'
                rel='noreferrer'
              >
                <img src={ facebookIcon } alt="Ссылка на Facebook"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}