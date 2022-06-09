import React from 'react';
import PropTypes from 'prop-types';

function AdminUsersTable(props) {
  const { users, handleRemoveUser } = props;

  return (
    <div>
      <h2>Lista de usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users.length
          && users.map(({ id, name, email, role }, i) => {
            let type = 'P. Administradora';
            if (role === 'seller') type = 'P. Vendedora';
            if (role === 'customer') type = 'Cliente';

            return (
              <tr key={ `admin-users-table-${i}` }>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${i}` }
                >
                  {i + 1}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${i}` }
                >
                  {name}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${i}` }
                >
                  {email}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${i}` }
                >
                  {type}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={ () => handleRemoveUser(id) }
                    data-testid={ `admin_manage__element-user-table-remove-${i}` }
                  >
                    x
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
