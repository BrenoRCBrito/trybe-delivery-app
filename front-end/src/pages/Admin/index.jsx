import React, { useEffect, useContext, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import AdminForm from '../../components/AdminComponents/Form';
import Navbar from '../../components/Navbar/Navbar';
import AdminUsersTable from '../../components/AdminUsersTable/AdminUsersTable';
import Context from '../../context/Context';
import { getSellers, deleteUser } from '../../services';

function Admin() {
  const [users, setUsers] = useState([]);
  const [failedToDelete, setFailedToDelete] = useState('');

  const {
    token,
    initializeUser,
  } = useContext(Context);

  const handleRemoveUser = (id) => {
    deleteUser(token, id)
      .then((status) => {
        if (status === StatusCodes.NO_CONTENT || status === StatusCodes.NOT_FOUND) {
          setUsers(users.filter((user) => user.id !== id));
          setFailedToDelete('');
        } else {
          setFailedToDelete('Falha ao apagar o usuário');
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
      getSellers(token)
        .then((response) => {
          setUsers(response.users);
        })
        .catch((e) => console.log(e));
    }
  }, [initializeUser, setUsers, token]);

  return (
    <div>
      <Navbar />
      <AdminForm />
      <AdminUsersTable
        users={ users }
        handleRemoveUser={ handleRemoveUser }
        failedToDelete={ failedToDelete }
      />
    </div>
  );
}

export default Admin;
