import React, { useState, useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { getSellers } from '../../services';
import CheckoutTable from '../../components/CheckoutTable/CheckoutTable';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';

import Navbar from '../../components/Navbar/Navbar';

function CustomerCheckout() {
  const { userData, cart, initializeUser, setCart } = useContext(Context);
  const { products, totalPrice } = cart;
  const totalPriceBR = totalPrice
    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  const [sellers, setSellers] = useState([]);

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

  const handleChange = ({ target: { name, value } }) => {
    setCart({ ...cart, [name]: value });
  };

  return (
    <div>
      <Navbar />
      <h2>Finalizar Pedido</h2>
      <div>
        <CheckoutTable products={ products } />
        <h2>
          Total:
          {' '}
          <span
            data-testid="customer_checkout__element-order-total-price"
          >
            {totalPriceBR}
          </span>
        </h2>
      </div>
      <h2>Detalhes e Endereço para Entrega</h2>
      <div>
        <CheckoutForm sellers={ sellers } handleChange={ handleChange } />
      </div>
    </div>
  );
}

export default CustomerCheckout;
