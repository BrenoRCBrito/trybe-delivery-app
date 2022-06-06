import React from 'react';

function AdminForm() {
  return (
    <div id="admin-form-container">
      <h1>NavBar Lindona</h1>
      <div>
        <input data-testid="admin_manage__input-name" />
        <input data-testid="admin_manage__input-email" />
        <input data-testid="admin_manage__input-password" />
        <select data-testid="admin_manage__select-role">
          <option>vendedor</option>
          <option>cliente</option>
        </select>
        <button type="button" data-testid="admin_manage__button-register">bob</button>
        <div>
          <div data-testid="admin_manage__element-user-table-item-number-4">o</div>
          <div data-testid="admin_manage__element-user-table-name-4">o</div>
          <div data-testid="admin_manage__element-user-table-email-4">o</div>
          <div data-testid="admin_manage__element-user-table-role-4">o</div>
          <div data-testid="admin_manage__element-user-table-remove-4">o</div>
        </div>
      </div>
    </div>
  );
}

export default AdminForm;
