import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import inputsDatas from '../utils/inputsDatas';
import GenericInput from '../GenericInput';
import { postRegister } from '../../services';
import { validateRegister } from '../utils/utils';

function RegisterForm() {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [status, setStatus] = useState();

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
    setStatus(await postRegister(userEmail, userName, userPassword));
  };

  useEffect(() => {
    if (typeof status === 'object') return goTo.push('/customer/products');
  }, [status, goTo]);

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

        { typeof status !== 'object' && <p>{ status }</p> }
      </form>
    </div>
  );
}

export default RegisterForm;
