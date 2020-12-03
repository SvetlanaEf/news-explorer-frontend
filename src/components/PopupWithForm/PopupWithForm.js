import React from 'react';
import Popup from "../Popup/Popup";

export default function PopupWithForm({ title, isOpen, onClose, onSubmit, children, validationSchema }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.elements) {
      const values = {};

      Array.from(e.target.elements).forEach(element => {
        if (element.name) {
          values[element.name] = element.value;
        }
      })

      onSubmit(values);
    }
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