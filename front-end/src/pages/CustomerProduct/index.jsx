import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { getProducts } from '../../services';
import Navbar from '../../components/Navbar/Navbar';
import ProductsList from '../../components/ProductsList/ProductsList';

function CustomerProducts() {
  const { userData, checkout, initializeCart, initializeUser } = useContext(Context);

  const goTo = useHistory();

  const { cart: { totalPrice } } = checkout;
  const totalPriceBR = totalPrice
    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  useEffect(() => {
    initializeUser();
    if (userData.token) {
      getProducts(userData.token)
        .then((response) => {
          initializeCart(response.products);
        })
        .catch((e) => console.log(e));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

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
