import React, { useEffect, useContext, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import AdminForm from '../../components/AdminComponents/Form';
import Navbar from '../../components/Navbar/Navbar';
import AdminUsersTable from '../../components/AdminUsersTable/AdminUsersTable';
import Context from '../../context/Context';
import { getSellers, deleteUser } from '../../services';

function Admin() {
  const [users, setUsers] = useState([]);
  const {
    token,
    initializeUser,
  } = useContext(Context);

  const handleRemoveUser = (id) => {
    deleteUser(token, id)
      .then((status) => {
        if (status === StatusCodes.NO_CONTENT) {
          setUsers(users.filter((user) => user.id !== id));
        }
      })
      .catch((status) => {
        console.log(status);
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
      <AdminUsersTable users={ users } handleRemoveUser={ handleRemoveUser } />
    </div>
  );
}

export default Admin;
