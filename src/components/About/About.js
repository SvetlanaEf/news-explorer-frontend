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

          <p className='about__description'>Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
          <p className='about__description'>Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>
        </div>
      </div>
    </section>
  );
}