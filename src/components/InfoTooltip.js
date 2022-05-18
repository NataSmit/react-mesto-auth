import React from 'react';
import closeIcon from "../images/Close-Icon.svg";

export default function InfoTooltip(props) {
  return (
    <div
    className={`popup  ${
      props.isOpen ? "popup_opened" : ""
    }`}
      
    >
      <div className="popup__container popup__container_type_tooltip">
        <div className="popup__tooltip-img"></div>
        <p className="popup__tooltip-message">Вы успешно зарегистрировались!</p>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
        >
          <img className="popup__close-icon" src={closeIcon} alt="Закрыть" />
        </button>
      </div>
    </div>
  )
}
