import React, { useContext, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { getProducts } from '../../services';
import Navbar from '../../components/Navbar/Navbar';
import ProductsList from '../../components/ProductsList/ProductsList';

function CustomerProducts() {
  const {
    products,
    token,
    checkout,
    initializeCheckout,
    initializeUser,
  } = useContext(Context);

  const goTo = useHistory();

  const initialized = useMemo(() => products.length !== 0, [products]);

  useEffect(() => {
    initializeUser();
    if (token && !initialized) {
      getProducts(token)
        .then((response) => {
          initializeCheckout(response.products);
        })
        .catch((e) => console.log(e));
    }
  }, [initializeCheckout, initializeUser, initialized, token]);

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
