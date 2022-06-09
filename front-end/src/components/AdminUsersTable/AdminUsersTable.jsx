import React from 'react';
import PropTypes from 'prop-types';

function AdminUsersTable(props) {
  const { users, handleRemoveUser } = props;
  console.log(users);
  handleRemoveUser('xablau');
  return (
    <div>
      <div data-testid="admin_manage__element-user-table-item-number-4">o</div>
      <div data-testid="admin_manage__element-user-table-name-4">o</div>
      <div data-testid="admin_manage__element-user-table-email-4">o</div>
      <div data-testid="admin_manage__element-user-table-role-4">o</div>
      <div data-testid="admin_manage__element-user-table-remove-4">o</div>
    </div>
  );
}

AdminUsersTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleRemoveUser: PropTypes.func.isRequired,
};

export default AdminUsersTable;
