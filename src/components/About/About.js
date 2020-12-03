import React from 'react';
import avatar from '../../images/avatar.jpg';
import './About.css';

export default function About() {
  return (
    <section className='about'>
      <div className='about__container container'>
        <img
          className='about__avatar'
          src={ avatar }
          alt="Светалана Ефимова"
        />
        <div className='about__data'>
          <h2 className='about__title'>Об авторе</h2>

          <p className='about__description'>Меня зовут Светлана. В данный момент я обучаюсь на курсе Яндекс.Практикум на веб-разработчика. В процессе обучения я овладела такими технологиями как: HTML, CSS, JS, REACT, Node.js, Express.js</p>
          <p className='about__description'> Выполнила различные проекты: про то как правильно подходить к обучению, про путешествия по России, а также своеобразный аналог инстаграмма, с возможностью ставить лайки и публиковать фотографии.</p>
        </div>
      </div>
    </section>
  );
}