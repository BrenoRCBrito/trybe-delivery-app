import React, { useEffect, useState, useContext } from 'react';
import { StatusCodes } from 'http-status-codes';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';

import inputsDatas from '../utils/inputsDatas';
import GenericInput from '../GenericInput';
import { postRegister } from '../../services';
import { validateRegister } from '../utils/utils';

function RegisterForm() {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [response, setResponse] = useState();
  const { setUserData } = useContext(Context);

  const goTo = useHistory();

  const handleInputLogin = ({ target }) => {
    setUserEmail(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setUserPassword(target.value);
  };

  const handleInputName = ({ target }) => {
    setUserName(target.value);
  };

  const handleStatusLogin = async (event) => {
    event.preventDefault();
    setResponse(await postRegister(userEmail, userName, userPassword));
  };

  useEffect(() => {
    if (typeof response === 'object') {
      setUserData(response);
      return goTo.push('/customer/products');
    }
  }, [response, goTo, setUserData]);

  return (
    <div>
      <form>
        <GenericInput
          data={ inputsDatas.Email }
          value={ userEmail }
          handler={ handleInputLogin }
        />

        <GenericInput
          data={ inputsDatas.Name }
          value={ userName }
          handler={ handleInputName }
        />

        <GenericInput
          data={ inputsDatas.RegisterPassword }
          value={ userPassword }
          handler={ handleInputPassword }
        />

        <button
          type="submit"
          data-testid="common_register__button-register"
          disabled={ validateRegister(userEmail, userName, userPassword) }
          onClick={ (event) => handleStatusLogin(event) }
        >
          CADASTRAR
        </button>

        { response === StatusCodes.CONFLICT
          && (
            <span
              data-testid="common_register__element-invalid_register"
            >
              Usuário já registrado!
            </span>
          ) }
      </form>
    </div>
  );
}

export default RegisterForm;
