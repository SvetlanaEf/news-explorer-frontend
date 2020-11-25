import React, { useEffect, useRef } from 'react';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import './Popup.css';

export default function Popup({ isOpen, onClose, children, title }) {
  const containerRef = useRef(null);
  const handleClose = (e) => {
    if (!containerRef || !containerRef.current) return;
    if (!containerRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscapeClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscapeClose);

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [ onClose ]);

  useEffect(() => {
    document.body.classList[isOpen ? 'add' : 'remove']('open-popup');

    return () => document.body.classList.remove('open-popup');
  }, [ isOpen ]);

  return (
    <div className={ `popup ${ isOpen ? 'popup_opened' : '' }` } onClick={ handleClose }>
      <div className='popup__container' ref={ containerRef }>
        { title && <p className='popup__title'>{ title }</p> }

        <button className='popup__close' onClick={ onClose }>
          <CloseIcon/>
        </button>

        <div className='popup__content'>
          { children }
        </div>
      </div>
    </div>
  );
}