import React from 'react';
import LoginForm from '../../components/LoginComponents/Form';
import beer from '../../images/entregador.png';

function Login() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <img src={ beer } alt="imagem do nosso logo" width="200px" />
      <h1 className="font-bold text-4xl my-12">Delivery App</h1>
      <LoginForm />
    </div>
  );
}

export default Login;
