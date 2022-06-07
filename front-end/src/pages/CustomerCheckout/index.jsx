import React, { useState, useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { getSellers } from '../../services';
import CheckoutTable from '../../components/CheckoutTable/CheckoutTable';

import Navbar from '../../components/Navbar/Navbar';

function CustomerCheckout() {
  const { userData, cart, initializeUser } = useContext(Context);
  const { products } = cart;
  const [sellers, setSellers] = useState([]);
  console.log(sellers);

  useEffect(() => {
    initializeUser();
    if (userData.token) {
      getSellers(userData.token)
        .then((response) => {
          setSellers(response.users);
        })
        .catch((e) => console.log(e));
    }
  }, [initializeUser, userData]);

  return (
    <div>
      <Navbar />
      <h1>Finalizar Pedido</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <CheckoutTable products={ products } />
      </table>

    </div>
  );
}

export default CustomerCheckout;
