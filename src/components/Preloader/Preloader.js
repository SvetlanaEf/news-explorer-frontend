import React from 'react';
import './Preloader.css';

export default function Preloader({ text }) {
  return (
    <div className='preloader'>
      <i className='preloader__spin'/>
      {text && <p className='preloader__text'>{ text }</p>}
    </div>
  );
}
