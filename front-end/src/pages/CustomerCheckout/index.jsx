import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { getUsers, postSale } from '../../services';
import CheckoutTable from '../../components/CheckoutTable/CheckoutTable';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import {
  setCheckoutLS,
  clearCheckoutLS,
  INITIAL_CHECKOUT,
} from '../../services/localStorage';

import Navbar from '../../components/Navbar/Navbar';

function CustomerCheckout() {
  const {
    token,
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
    initializeUser();
    if (token) {
      getUsers(token)
        .then((response) => {
          setSellers(response.users);
        })
        .catch((e) => console.log(e));
    }
  }, [initializeUser, token]);

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
    postSale(token, checkout)
      .then((response) => {
        if (response.sale.id) {
          setCheckout(INITIAL_CHECKOUT);
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
        { products.length
        && <CheckoutTable
          products={ products }
          handleRemoveItem={ handleRemoveItem }
        />}
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
