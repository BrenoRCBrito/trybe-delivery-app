import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import adminData from '../utils/adminData';
import GenericInput from '../GenericInput';
import { validateRegister as buttonEnabler } from '../utils/utils';
// import { postAdminRegister } from '../../services';
// import Context from '../../context/Context';

function AdminForm(props) {
  const { handleRegister } = props;

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('seller');
  const [registerButton, setRegisterButton] = useState(false);
  // const { token } = useContext(Context);

  const generalHandler = ({ target }) => {
    if (target.id === 'name-id') setUserName(target.value);
    if (target.id === 'email-id') setUserEmail(target.value);
    if (target.id === 'password-id') setUserPassword(target.value);
    if (target.id === 'select-role-id') setUserRole(target.value);
  };

  // const handleRegister = async () => {
  //   const newUser = { userEmail, userName, userPassword, userRole, token };
  //   await postAdminRegister(newUser);
  // };

  useEffect(() => {
    const validateButton = buttonEnabler(userEmail, userName, userPassword);
    setRegisterButton(validateButton);
  }, [userName, userEmail, userPassword, userRole]);

  return (
    <div id="admin-form-container">
      <div>
        <h2>Cadastrar novo usuário</h2>
        <GenericInput
          data={ adminData.Name }
          value={ userName }
          handler={ generalHandler }
        />
        <GenericInput
          data={ adminData.Email }
          value={ userEmail }
          handler={ generalHandler }
        />
        <GenericInput
          data={ adminData.Password }
          value={ userPassword }
          handler={ generalHandler }
        />
        <select
          id="select-role-id"
          data-testid={ adminData.Role.testId }
          value={ userRole }
          onChange={ generalHandler }
        >
          <option value="seller">vendedor</option>
          <option value="customer">cliente</option>
        </select>
        <button
          type="button"
          data-testid="admin_manage__button-register"
          disabled={ registerButton }
          onClick={ () => handleRegister({
            userName,
            userEmail,
            userPassword,
            userRole,
          }) }
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}

AdminForm.propTypes = {
  handleRegister: PropTypes.func.isRequired,
};

export default AdminForm;
