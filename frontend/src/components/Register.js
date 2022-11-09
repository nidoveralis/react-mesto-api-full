import {api} from '../utils/Api';
import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";

function Register(props) {
  //console.log(props)
  const history = useHistory(); 
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  function emailInputValue(e) {
    setEmailValue(e.target.value);
  };

  function passwordInputValue(e) {
    setPasswordValue(e.target.value);
  };

  function onRegister() {
    const { password,email } = {
      password: passwordValue,
      email: emailValue
    };
    api.signUp(password,email).then((data)=>{
      if(data){
        props.answer('success');
        history.push('/signin');
      }
    })
    .catch(()=>props.answer('error'))
  }

  return(
    <div className="login">
      <form className="login__form">
        <h2 className="login__title">Регистрация</h2>
        <fieldset className="login__field">
          <input type='text' className="login__input" name="mail" placeholder="Email" onChange={emailInputValue} />
        </fieldset>
        <fieldset className="login__field">
        <input type='password' className="login__input" name="password" placeholder="Пароль" onChange={passwordInputValue} />
        </fieldset>
      </form>
      <div className="login__buttons">
        <button className="login__button" onClick={onRegister}>Зарегистрироваться</button>
        <Link to="./signin" className="login__sing-in">Уже зарегистрированы? Войти</Link>
      </div>
    </div>
  )
};
export default withRouter(Register);