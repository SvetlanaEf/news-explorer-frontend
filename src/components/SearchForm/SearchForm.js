import React, { useRef } from 'react';
import './SearchForm.css';

export default function SearchForm({ onSubmit }) {
  const searchRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchRef.current.value);
  };

  return (
    <form className='search-form' onSubmit={ handleSubmit }>
      <input
        className='search-form__field'
        placeholder='Введите тему новости'
        type="search"
        name='search'
        ref={ searchRef }
      />
      <button className='search-form__button' type='submit'>Искать</button>
    </form>
  );
}