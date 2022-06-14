import React, { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { getProducts } from '../../services';
import Navbar from '../../components/Navbar/Navbar';
import ProductsList from '../../components/ProductsList/ProductsList';

function CustomerProducts() {
  const {
    // products,
    token,
    checkout,
    initializeCheckout,
    initializeUser,
    initializedUser,
  } = useContext(Context);

  const goTo = useHistory();

  // const initialized = useMemo(() => products.length !== 0, [products]);

  const initializedCheckout = useRef(false);
  const count = useRef(0);

  useEffect(() => {
    if (!initializedUser.current) initializeUser();
    if (!initializedCheckout.current && token) {
      count.current += 1;
      console.log('useEffect CustomerProduct', count);
      if (!initializedCheckout.current) {
        getProducts(token)
          .then((response) => {
            initializeCheckout(response.products);
            initializedCheckout.current = true;
          })
          .catch((e) => console.log(e));
      }
    }
  }, [initializeCheckout, initializeUser, initializedUser, token]);

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
