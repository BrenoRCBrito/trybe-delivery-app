import React, { useState } from 'react';
import { StatusCodes } from 'http-status-codes';

import postLogin from '../../services';
import validateInputs from './utils';
import inputsDatas from './inputsDatas';
import GenericInput from '../GenericInput';

function LoginForm() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [status, setStatus] = useState();

  const handleInputLogin = ({ target }) => {
    setUserEmail(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setUserPassword(target.value);
  };

  const handleStatusLogin = async (event) => {
    event.preventDefault();
    setStatus(await postLogin(userEmail, userPassword));
  };

  return (
    <div>
      <img alt="imagem do nosso logo" />
      <form>
        <GenericInput
          data={ inputsDatas.Login }
          value={ userEmail }
          handler={ handleInputLogin }
        />

        <GenericInput
          data={ inputsDatas.Password }
          value={ userPassword }
          handler={ handleInputPassword }
        />

        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ validateInputs(userEmail, userPassword) }
          onClick={ (event) => handleStatusLogin(event) }
        >
          LOGIN
        </button>

        <button
          type="submit"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>

        { status === StatusCodes.NOT_FOUND
          && (
            <span
              data-testid="common_login__element-invalid-email"
            >
              Usuário não encontrado
            </span>
          ) }
      </form>
    </div>
  );
}

export default LoginForm;
