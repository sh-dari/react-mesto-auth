import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';
import { AppContext } from '../contexts/AppContext';

function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AppContext);
  const [formValue, setFormValue] = useState({
    password: '',
    email: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }
    auth.authorize(formValue.password, formValue.email)
    .then((data) => {
      if (data){
        setFormValue({password: '', email: ''});
        handleLogin();
        navigate('/', {replace: true});
      }
    })
    .catch(err => console.log(err));
  }
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  return (
    <div className="login">
      <h2 className="login__welcome">Вход</h2>
      <form onSubmit={handleSubmit} className="popup__container login__form">
        <fieldset className="popup__input-container login__input-container">
          <input className="popup__item login__item" type="email" id="email" name="email" placeholder="Email" value={formValue.email} onChange={handleChange} />
          <input className="popup__item login__item" type="password" id="password" name="password" placeholder="Пароль" value={formValue.password} onChange={handleChange} />
        </fieldset>
        <button type="submit" className="popup__button popup__button_for_profile login__button" disabled="">Войти</button>
      </form>
    </div>
  )
}

export default Login;
