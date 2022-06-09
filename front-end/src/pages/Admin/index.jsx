import React from 'react';
import AdminForm from '../../components/AdminComponents/Form';
import Navbar from '../../components/Navbar/Navbar';
import AdminUsersTable from '../../components/AdminUsersTable/AdminUsersTable';

function Login() {
  return (
    <div>
      <Navbar />
      <AdminForm />
      <AdminUsersTable />
    </div>
  );
}

export default Login;
