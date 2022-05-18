import React from 'react'

export default function Login() {
  return (
    <div className="popup__container popup__container_theme_black">
        <h2 className="popup__title">Вход</h2>
        <form
          className="popup__form"
          action="/"
         
          noValidate
         
        >

        <input
       
        className="popup__form-input popup__form-input_theme_black popup__form-input_type_name"
        type="text"
        required
        minLength="2"
        maxLength="40"
        placeholder="Email"
        
        />
      
      <input
        
        
        
        className="popup__form-input popup__form-input_theme_black popup__form-input_type_activity"
        type="text"
        required
        minLength="2"
        maxLength="200"
        placeholder="Пароль"
       
      />
      
          
          <button className="popup__submit-btn popup__submit-btn_theme_black" type="submit">
           Войти
          </button>
        </form>
        
    </div>
  )
}
