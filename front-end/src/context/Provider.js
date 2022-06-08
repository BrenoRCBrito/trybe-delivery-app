import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';
import { getCartLS, getUserLS, setCartLS, setUserLS } from '../services/localstorage';

function Provider({ children }) {
  const [userData, setUserData] = useState({});
  const [checkout, setCheckout] = useState(getCartLS());
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const initializeUser = () => {
    const user = getUserLS();
    if (!user && userData.id) {
      setUserLS(userData);
    } else if (user && !userData.id) {
      // renovar o token com backend
      setUserData(user);
    }
  };

  const calculateTotalPrice = (array) => {
    const sum = array.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
    const response = Math.round(sum * 100) / 100;
    return response;
  };

  const initializeCart = (array) => {
    const productsToSave = array.map((product) => {
      const { price, id, ...rest } = product;
      let quantity = 0;
      const foundProduct = checkout
        .products.find(({ id: productId }) => id === productId);
      if (foundProduct) {
        quantity = foundProduct.quantity;
      }
      return { ...rest, id, price: Number(price), quantity: Number(quantity) };
    });
    const totalPrice = calculateTotalPrice(productsToSave);
    const onlyAddedProducts = productsToSave.filter(({ quantity }) => quantity > 0);
    setProducts(productsToSave);
    setCartLS({
      cart: { ...checkout.cart, totalPrice },
      products: onlyAddedProducts });
    setCheckout({
      cart: { ...checkout.cart, totalPrice },
      products: onlyAddedProducts });
  };

  const setQuantity = (id, qtd) => {
    const index = products.findIndex(({ id: productId }) => id === productId);
    const productsToUpdate = [...products];
    productsToUpdate[index].quantity = Number(qtd);
    const totalPrice = calculateTotalPrice(productsToUpdate);
    const onlyAddedProducts = products.filter(({ quantity }) => quantity > 0);
    setProducts(productsToUpdate);
    setCheckout({ cart: { ...checkout.cart, totalPrice }, products: onlyAddedProducts });
    setCartLS({ cart: { ...checkout.cart, totalPrice }, products: onlyAddedProducts });
  };

  const context = {
    userData,
    setUserData,
    checkout,
    setCheckout,
    products,
    orders,
    calculateTotalPrice,
    setOrders,
    setQuantity,
    initializeCart,
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
