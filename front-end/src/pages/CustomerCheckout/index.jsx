import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { getSellers, postSale } from '../../services';
import CheckoutTable from '../../components/CheckoutTable/CheckoutTable';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import {
  setCheckoutLS,
  clearCheckoutLS,
  INITIAL_CART,
} from '../../services/localstorage';

import Navbar from '../../components/Navbar/Navbar';

function CustomerCheckout() {
  const {
    userData,
    checkout,
    setCheckout,
    initializeUser,
    synchronizeProducts,
  } = useContext(Context);

  const { products, cart: { totalPrice } } = checkout;

  const totalPriceBR = totalPrice
    .toLocaleString('pt-br', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const [sellers, setSellers] = useState([]);

  const goTo = useHistory();

  useEffect(() => {
    const customerCheckoutEffect = () => {
      initializeUser();
      if (userData.token) {
        getSellers(userData.token)
          .then((response) => {
            setSellers(response.users);
          })
          .catch((e) => console.log(e));
      }
    };

    customerCheckoutEffect();
  }, [initializeUser, userData]);

  const handleChange = ({ target: { name, value } }) => {
    const updatedCheckout = { ...checkout, cart: { ...checkout.cart, [name]: value } };
    setCheckout(updatedCheckout);
    setCheckoutLS(updatedCheckout);
  };

  const handleRemoveItem = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    synchronizeProducts(updatedProducts);
  };

  const handleSubmit = () => {
    postSale(userData.token, checkout)
      .then((response) => {
        if (response.sale.id) {
          setCheckout(INITIAL_CART);
          clearCheckoutLS();
          goTo.push(`/customer/orders/${response.sale.id}`);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Navbar />
      <h2>Finalizar Pedido</h2>
      <div>
        <CheckoutTable
          products={ products }
          handleRemoveItem={ handleRemoveItem }
        />
        <h3>
          Total: R$
          {' '}
          <span data-testid="customer_checkout__element-order-total-price">
            {totalPriceBR}
          </span>
        </h3>
      </div>
      <h2>Detalhes e Endereço para Entrega</h2>
      <div>
        <CheckoutForm
          sellers={ sellers }
          handleChange={ handleChange }
          handleSubmit={ handleSubmit }
        />
      </div>
    </div>
  );
}

export default CustomerCheckout;
