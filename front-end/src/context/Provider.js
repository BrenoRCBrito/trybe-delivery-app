import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import Context from './Context';
import {
  setUserLS,
  getUserLS,
  setCheckoutLS,
  getCheckoutLS,
} from '../services/localstorage';

function Provider({ children }) {
  const [userData, setUserData] = useState({});
  const [checkout, setCheckout] = useState(getCheckoutLS());
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const initializeUser = useCallback(() => {
    console.log('initializeUser');
    const user = getUserLS();
    if (!user && userData.id) {
      setUserLS(userData);
    } else if (user && !userData.id) {
      // renovar o token com backend
      setUserData(user);
    }
  }, [userData]);

  const calculateTotalPrice = (array) => {
    const sum = array.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
    return Math.round(sum * 100) / 100;
  };

  const synchronizeProducts = (productsToSync) => {
    const totalPrice = calculateTotalPrice(productsToSync);
    const onlyAddedProducts = productsToSync.filter(({ quantity }) => quantity > 0);
    const updateCheckout = {
      cart: { ...checkout.cart, totalPrice },
      products: onlyAddedProducts,
    };
    setCheckout(updateCheckout);
    setCheckoutLS(updateCheckout);
  };

  const initializeCheckout = (productsFromFetch) => {
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
  };

  const setQuantity = (id, qtd) => {
    const index = products.findIndex(({ id: productId }) => id === productId);
    const productsToUpdate = [...products];
    productsToUpdate[index].quantity = Number(qtd);
    setProducts(productsToUpdate);
    synchronizeProducts(productsToUpdate);
  };

  const context = {
    userData,
    setUserData,
    checkout,
    setCheckout,
    products,
    orders,
    synchronizeProducts,
    setOrders,
    setQuantity,
    initializeCheckout,
    initializeUser,
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
