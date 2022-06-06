import React, { useEffect, useState } from 'react';
// import { StatusCodes } from 'http-status-codes';
// import { useHistory } from 'react-router-dom';

function AdminForm() {
  return (
    <div id="admin-form-container">
      <h1>NavBar Lindona</h1>
      <div>
        <input data-testid="admin_manage__input-name"></input>
        <input data-testid="admin_manage__input-email"></input>
        <input data-testid="admin_manage__input-password"></input>
        <select data-testid="admin_manage__select-role">
          <option>vendedor</option>
          <option>cliente</option>
        </select>
        <button data-testid="admin_manage__button-register"></button>
        <div>
          <div data-testid="admin_manage__element-user-table-item-number-4"></div>
          <div data-testid="admin_manage__element-user-table-name-4"></div>
          <div data-testid="admin_manage__element-user-table-email-4"></div>
          <div data-testid="admin_manage__element-user-table-role-4"></div>
          <div data-testid="admin_manage__element-user-table-remove-4"></div>
        </div>
      </div>
    </div>
  )
}

export default AdminForm;
