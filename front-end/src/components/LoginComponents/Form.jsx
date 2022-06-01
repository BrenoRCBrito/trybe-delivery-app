import React from 'react';

function LoginForm() {
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
          />
        </label>

        <label htmlFor="password-id">
          Senha
          <input
            id="password-id"
            placeholder="Digite sua senha"
            data-testid="common_login__input-password"
          />
        </label>

        <button
          type="submit"
          data-testid="common_login__button-login"
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
