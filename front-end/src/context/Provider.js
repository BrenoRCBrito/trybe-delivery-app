import PropTypes from 'prop-types';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import {
  setUserLS,
  getUserLS,
  setCheckoutLS,
  getCheckoutLS,
  clearLocalStorage,
  INITIAL_CHECKOUT,
} from '../services/localStorage';
import { renewToken } from '../services';

const INITIAL_USER = {
  id: null,
  name: null,
  role: null,
  token: null,
};

function Provider({ children }) {
  const [user, setUser] = useState(INITIAL_USER);
  const [checkout, setCheckout] = useState(getCheckoutLS());
  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);

  const token = useMemo(() => user.token, [user]);

  const role = useMemo(() => user.role, [user]);

  const count = useRef(0);

  const initializedUser = useRef(false);

  const goTo = useHistory();

  const makeLogout = useCallback(() => {
    clearLocalStorage();
    setUser(INITIAL_USER);
    setCheckout(INITIAL_CHECKOUT);
    setProducts([]);
    setOrders([]);
    goTo.push('/login');
  }, [goTo]);

  const initializeUser = useCallback(() => {
    count.current += 1;
    console.log('initializeUser', count);
    const userLS = getUserLS();
    if (!userLS && user.id) {
      setUserLS(user);
    } else if (userLS && !user.id) {
      renewToken(userLS.token)
        .then(({ data }) => {
          setUser(data);
          setUserLS(data);
        })
        .catch(() => {
          makeLogout();
        });
    }
    initializedUser.current = true;
  }, [makeLogout, user]);

  const calculateTotalPrice = (array) => {
    const sum = array.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
    return Math.round(sum * 100) / 100;
  };

  const synchronizeProducts = useCallback((productsToSync) => {
    const totalPrice = calculateTotalPrice(productsToSync);
    const onlyAddedProducts = productsToSync.filter(({ quantity }) => quantity > 0);
    const updateCheckout = {
      cart: { ...checkout.cart, totalPrice },
      products: onlyAddedProducts,
    };
    setCheckout(updateCheckout);
    setCheckoutLS(updateCheckout);
  }, [checkout.cart]);

  const initializeCheckout = useCallback((productsFromFetch) => {
    const productsToSave = productsFromFetch.map((product) => {
      const { price, id, ...rest } = product;
      let quantity = 0;
      const foundProduct = checkout
        .products.find(({ id: productId }) => id === productId);
      if (foundProduct) {
        quantity = foundProduct.quantity;
      }
      return { ...rest, id, price: Number(price), quantity: Number(quantity) };
    });
    setProducts(productsToSave);
    synchronizeProducts(productsToSave);
  }, [checkout.products, synchronizeProducts]);

  const setQuantity = (id, qtd) => {
    const index = products.findIndex(({ id: productId }) => id === productId);
    const productsToUpdate = [...products];
    productsToUpdate[index].quantity = Number(qtd);
    setProducts(productsToUpdate);
    synchronizeProducts(productsToUpdate);
  };

  const context = {
    user,
    setUser,
    initializeUser,
    initializedUser,
    checkout,
    setCheckout,
    initializeCheckout,
    products,
    setQuantity,
    synchronizeProducts,
    orders,
    setOrders,
    token,
    role,
    makeLogout,
  };

  return (
    <main>
      <Context.Provider value={ context }>
        {children}
      </Context.Provider>
    </main>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
