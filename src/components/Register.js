import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth';

function Register({ onRegistrationSubmit, handleSuccessRegistration }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(formValue.password, formValue.email)
    .then((data) => {
        if (!data.error) {
          handleSuccessRegistration();
        }
        onRegistrationSubmit();
      }
    )
    .catch(err => {
      console.log(err);
    });
  }
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  return (
    <div className="login register">
      <h2 className="login__welcome register__welcome">Регистрация</h2>
      <form onSubmit={handleSubmit} className="popup__container login__form">
        <fieldset className="popup__input-container login__input-container">
          <input className="popup__item login__item" type="email" id="email" name="email" placeholder="Email" value={formValue.email} onChange={handleChange} />
          <input className="popup__item login__item" type="password" id="password" name="password" placeholder="Пароль" value={formValue.password} onChange={handleChange} />
        </fieldset>
        <button type="submit" className="popup__button popup__button_for_profile login__button" disabled="">Зарегестрироваться</button>
      </form>
      <div className="register__signin">
        <p className="register__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;
