import React from 'react';
import Popup from "../Popup/Popup";

export default function PopupWithForm({ title, isOpen, onClose, onSubmit, children }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Popup
      title={ title }
      isOpen={ isOpen }
      onClose={ onClose }
    >
      <form onSubmit={ handleSubmit }>
        { children }
      </form>
    </Popup>
  );
}