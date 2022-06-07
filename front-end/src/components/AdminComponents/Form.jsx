import React, { useEffect, useState } from 'react';
import adminData from '../utils/adminData';
import GenericInput from '../GenericInput';
import { validateRegister as buttonEnabler } from '../utils/utils';

function AdminForm() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('seller');
  const [registerButton, setRegisterButton] = useState(false);

  const generalHandler = ({ target }) => {
    if (target.id === 'name-id') setUserName(target.value);
    if (target.id === 'email-id') setUserEmail(target.value);
    if (target.id === 'password-id') setUserPassword(target.value);
    if (target.id === 'select-role-id') setUserRole(target.value);
  };

  useEffect(() => {
    const validateButton = buttonEnabler(userEmail, userName, userPassword);
    setRegisterButton(validateButton);
  }, [userName, userEmail, userPassword, userRole]);

  return (
    <div id="admin-form-container">
      <h1>NavBar Lindona</h1>
      <div>
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
        >
          Cadastrar
        </button>
      </div>
      <div>
        <div data-testid="admin_manage__element-user-table-item-number-4">o</div>
        <div data-testid="admin_manage__element-user-table-name-4">o</div>
        <div data-testid="admin_manage__element-user-table-email-4">o</div>
        <div data-testid="admin_manage__element-user-table-role-4">o</div>
        <div data-testid="admin_manage__element-user-table-remove-4">o</div>
      </div>
    </div>
  );
}

export default AdminForm;
