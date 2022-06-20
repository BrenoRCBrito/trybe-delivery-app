import React, { useEffect, useState, useContext } from 'react';
import { StatusCodes } from 'http-status-codes';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';

import { postLogin } from '../../services';
import { setUserLS } from '../../services/localStorage';
import { validateLogin } from '../utils/utils';
import inputsDatas from '../utils/inputsDatas';
import GenericInput from '../GenericInput';

function LoginForm() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [response, setResponse] = useState();
  const [loginStatus, setLoginStatus] = useState(false);
  const { token, role, setUser, initializeUser } = useContext(Context);

  const goTo = useHistory();

  const handleInputLogin = ({ target }) => {
    setUserEmail(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setUserPassword(target.value);
  };

  const handleStatusLogin = async (event) => {
    event.preventDefault();
    const res = await postLogin(userEmail, userPassword);
    setResponse(res);
    if (res.token) {
      setLoginStatus(true);
    }
  };

  useEffect(() => {
    initializeUser();
    if (!token && loginStatus) {
      setUser(response);
      setUserLS(response);
    }
    if (role) {
      switch (role) {
      case 'seller':
        goTo.push('/seller/orders');
        break;
      case 'administrator':
        goTo.push('/admin/manage');
        break;
      default:
        goTo.push('/customer/products');
      }
    }
  }, [goTo, loginStatus, response, setUser, initializeUser, token, role]);

  return (
    <form
      className={ `flex flex-col w-[26.563rem] h-[27.75rem] items-center
      justify-evenly border border-[#B1C2BE] bg-[#EAF1EF] shadow-login` }
    >
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
        className={ `w-[87%] h-[6.35vh] rounded-[10px] bg-[#036B52]
        text-2xl font-normal text-[#F2FFFC]
        transition duration-500
        enabled:hover:bg-transparent enabled:hover:text-[#036B52] enabled:hover:border-2
        enabled:border-[#036B52] disabled:opacity-30 disabled:bg-[#034b3ac9]` }
      >
        LOGIN
      </button>

      <button
        type="submit"
        data-testid="common_login__button-register"
        onClick={ (event) => {
          event.preventDefault();
          goTo.push('/register');
        } }
        className={ `w-[87%] h-[6.35vh] rounded-[10px] bg-transparent
        text-2xl font-normal text-[#036B52] border-2 border-[#036B52]
        transition duration-500 hover:bg-[#036B52] hover:text-[#F2FFFC]` }
      >
        Ainda não tenho conta
      </button>

      {response === StatusCodes.NOT_FOUND && (
        <span data-testid="common_login__element-invalid-email">
          Usuário não encontrado
        </span>
      )}
    </form>
  );
}

export default LoginForm;
