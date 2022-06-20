import React, { useEffect, useState, useContext } from 'react';
import { StatusCodes } from 'http-status-codes';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';

import inputsDatas from '../utils/inputsDatas';
import GenericInput from '../GenericInput';
import { postRegister } from '../../services';
import { setUserLS } from '../../services/localStorage';
import { validateRegister } from '../utils/utils';

function RegisterForm() {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [response, setResponse] = useState();
  const { setUser } = useContext(Context);

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
      setUserLS(response);
      setUser(response);
      return goTo.push('/customer/products');
    }
  }, [response, goTo, setUser]);

  return (
    <div>
      <form
        className={ `flex flex-col w-[26.563rem] h-[31.563rem] items-center
      bg-[#EAF1EF] border border-[#B1C2BE] justify-evenly shadow-login` }
      >
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
          className={ `w-[87%] h-[6.35vh] rounded-[10px] bg-[#036B52]
          text-2xl font-normal text-[#F2FFFC]
          transition duration-500
          enabled:hover:bg-transparent enabled:hover:text-[#036B52] enabled:hover:border-2
          enabled:border-[#036B52] disabled:opacity-30 disabled:bg-[#034b3ac9]` }
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
