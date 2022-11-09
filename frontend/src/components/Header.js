import Logo from '../images/header__logo.svg';
import React from "react";
import { Switch, Route, Link } from 'react-router-dom';

function Header(props) {
  
  return(
    <header className="header">
      <img src={Logo} alt="Логотип" className="header__logo" />
      <div className='header__message'>
        <Switch>
          <Route path='/signup'>
            <Link to='/signin' className="header__button">Вход</Link>
          </Route>
          <Route path='/signin'>
            <Link to='/signup' className="header__button">Регистрация</Link>
          </Route>
          <Route path='/'>
            <p className="header__title">{props.message}</p>
            <button className="header__button" onClick={props.onSingOut}>Выйти</button>
          </Route>
        </Switch>
      </div>
    </header>
  )
};

export default Header;