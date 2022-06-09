import React, { useEffect, useContext, useState } from 'react';
import AdminForm from '../../components/AdminComponents/Form';
import Navbar from '../../components/Navbar/Navbar';
import AdminUsersTable from '../../components/AdminUsersTable/AdminUsersTable';
import Context from '../../context/Context';
import { getSellers } from '../../services';

function Admin() {
  const [users, setUsers] = useState([]);
  const {
    token,
    initializeUser,
  } = useContext(Context);

  const handleRemoveUser = (id) => {
    console.log(id);
  };

  console.log(users);
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
