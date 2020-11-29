import React from 'react';
import Popup from "../Popup/Popup";

export default function ErrorPopup({ isOpen, onClose, children }) {
  return (
    <Popup
      title='Ой! Ошибка'
      isOpen={ isOpen }
      onClose={ onClose }
    >
      { children }
    </Popup>
  )
}
