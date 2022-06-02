import React, { useEffect, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import { useHistory } from 'react-router-dom';

import { postLogin } from '../../services';
import { validateLogin } from '../utils/utils';
import inputsDatas from '../utils/inputsDatas';
import GenericInput from '../GenericInput';

function LoginForm() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [status, setStatus] = useState();
  const goTo = useHistory();

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

  useEffect(() => {
    if (typeof status === 'object') return goTo.push('/customer/products');
  }, [status, goTo]);

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
          disabled={ validateLogin(userEmail, userPassword) }
          onClick={ (event) => handleStatusLogin(event) }
        >
          LOGIN
        </button>

        <button
          type="submit"
          data-testid="common_login__button-register"
          onClick={ () => goTo.push('/register') }
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
