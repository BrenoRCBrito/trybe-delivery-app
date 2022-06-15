import React, { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { getProducts } from '../../services';
import Navbar from '../../components/Navbar/Navbar';
import ProductsList from '../../components/ProductsList/ProductsList';

function CustomerProducts() {
  const {
    token,
    checkout,
    initializeCheckout,
    initializeUser,
  } = useContext(Context);

  const goTo = useHistory();

  const initializedCheckout = useRef(false);

  useEffect(() => {
    initializeUser();
    if (!initializedCheckout.current && token) {
      getProducts(token)
        .then((response) => {
          initializeCheckout(response.products);
          initializedCheckout.current = true;
        })
        .catch((e) => console.log(e));
    }
  }, [initializeCheckout, initializeUser, token]);

  const { cart: { totalPrice } } = checkout;

  const totalPriceBR = totalPrice
    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  return (
    <div>
      <Navbar />
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => goTo.push('/customer/checkout') }
        disabled={ !totalPrice }
      >
        Ver Carrinho:
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { totalPriceBR }
        </span>
      </button>
      <ProductsList />
    </div>
  );
}

export default CustomerProducts;
