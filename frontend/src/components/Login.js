import React from "react";

function Login(props) { 
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  function emailInputValue(e) {
    setEmailValue(e.target.value);
  };

  function passwordInputValue(e) {
    setPasswordValue(e.target.value);
  }

  function signIn() {
    const { password,email } = {
      password: passwordValue,
      email: emailValue
    };
    props.onLogin({password,email})
  };

  return(
    <div className="login">
      <form className="login__form">
        <h2 className="login__title">Войти</h2>
        <fieldset className="login__field">
          <input type='text' className="login__input" name="mail" placeholder="Email" onChange={emailInputValue} />
        </fieldset>
        <fieldset className="login__field">
        <input type='password' className="login__input" name="parol" placeholder="Пароль" onChange={passwordInputValue}/>
        </fieldset>
      </form>
      <div className="login__buttons">
        <button className="login__button" onClick={signIn}>Войти</button>
      </div>
    </div>
  )
};
export default Login;