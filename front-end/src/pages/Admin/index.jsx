import React, { useEffect, useContext, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import AdminForm from '../../components/AdminComponents/Form';
import Navbar from '../../components/Navbar/Navbar';
import AdminUsersTable from '../../components/AdminUsersTable/AdminUsersTable';
import Context from '../../context/Context';
import { getUsers, postAdminRegister, deleteUser } from '../../services';

function Admin() {
  const [users, setUsers] = useState([]);
  const [fail, setFail] = useState('');

  const {
    token,
    user: currentUser,
    initializeUser,
  } = useContext(Context);

  const { id: currentId } = currentUser;

  const handleRegister = (newUser) => {
    postAdminRegister({ ...newUser, token })
      .then((response) => {
        // Axios Response shape:
        // { status: number, data: object }
        // when it resolves with a status code different than 4xx and 5xx
        const { status, data } = response;
        if (status === StatusCodes.CREATED) {
          setUsers([...users, data.user]);
          setFail('');
        }
      })
      .catch((error) => {
        // Axios Error shape:
        // { response: { status: number, data: object } }
        // when it rejects with a status code 4xx or 5xx
        const { response: { status, data } } = error;
        if (status === StatusCodes.CONFLICT) {
          setFail('Usuário já existe');
        } else if (status === StatusCodes.UNAUTHORIZED) {
          setFail('Revalide seu login');
        } else if (status === StatusCodes.BAD_REQUEST
        || status === StatusCodes.UNPROCESSABLE_ENTITY) {
          setFail('Campos inválidos');
        } else {
          setFail('Falha ao cadastrar usuário');
          console.log('Internal server error: received status code: ', status);
        }
        console.log(data);
      });
  };

  const handleRemoveUser = (id) => {
    deleteUser(token, id)
      .then((status) => {
        if (status === StatusCodes.NO_CONTENT || status === StatusCodes.NOT_FOUND) {
          setUsers(users.filter((user) => user.id !== id));
          setFail('');
        } else {
          setFail('Falha ao apagar o usuário');
          console.log('Expected status code to be 204 or 404 but got', status);
        }
      })
      .catch((status) => {
        console.log('Internal error: the server may be down - status: ', status);
      });
  };

  useEffect(() => {
    initializeUser();
    if (token) {
      getUsers(token)
        .then((response) => {
          setUsers(response.users);
        })
        .catch((e) => console.log(e));
    }
  }, [initializeUser, setUsers, token]);

  return (
    <div>
      <Navbar />
      <AdminForm handleRegister={ handleRegister } />
      <AdminUsersTable
        users={ users }
        currentId={ currentId }
        handleRemoveUser={ handleRemoveUser }
      />

      { fail
        && (
          <h3
            data-testid="admin_manage__element-invalid-register"
          >
            { fail }
          </h3>
        ) }
    </div>
  );
}

export default Admin;
