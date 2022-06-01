import React, { useState } from 'react';

function LoginForm() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const validateInputs = () => {
    const regex = /\S+@\S+\.[a-zA-Z]+/;
    const validEmail = regex.test(userEmail);
    const SIX = 6;

    if (validEmail && userPassword.length >= SIX) {
      return false;
    }
    return true;
  };

  const handleInputLogin = ({ target }) => {
    setUserEmail(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setUserPassword(target.value);
  };

  return (
    <div>
      <img alt="imagem do nosso logo" />
      <form>
        <label htmlFor="login-id">
          Login
          <input
            id="login-id"
            placeholder="Digite seu email"
            data-testid="common_login__input-email"
            value={ userEmail }
            onChange={ (event) => handleInputLogin(event) }
          />
        </label>

        <label htmlFor="password-id">
          Senha
          <input
            id="password-id"
            placeholder="Digite sua senha"
            data-testid="common_login__input-password"
            value={ userPassword }
            onChange={ (event) => handleInputPassword(event) }
          />
        </label>

        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ validateInputs() }
        >
          LOGIN
        </button>

        <button
          type="submit"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>

        {/* <span>Usuario não cadastrado!</span> */}
      </form>
    </div>
  );
}

export default LoginForm;
