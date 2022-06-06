import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';
import { getCartLS, getUserLS, setCartLS, setUserLS } from '../services/localstorage';

function Provider({ children }) {
  const [userData, setUserData] = useState({});
  const [cart, setCart] = useState(getCartLS());
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

  const initializeCart = (array) => {
    const productsToSave = array.map((product) => {
      const { price, id, ...rest } = product;
      let quantity = 0;
      const foundProduct = cart.products.find(({ id: productId }) => id === productId);
      if (foundProduct) {
        quantity = foundProduct.quantity;
      }
      return { ...rest, id, price: Number(price), quantity: Number(quantity) };
    });
    const totalPrice = productsToSave
      .reduce((acc, { price, quantity }) => acc + price * quantity, 0);
    const onlyAddedProducts = productsToSave.filter(({ quantity }) => quantity > 0);
    setProducts(productsToSave);
    setCartLS({ ...cart, userId: userData.id, totalPrice, products: onlyAddedProducts });
    setCart({ ...cart, userId: userData.id, totalPrice, products: productsToSave });
  };

  const setQuantity = (id, qtd) => {
    const index = products.findIndex(({ id: productId }) => id === productId);
    const productsToUpdate = [...products];
    productsToUpdate[index].quantity = Number(qtd);
    const totalPrice = productsToUpdate
      .reduce((acc, { price, quantity }) => acc + price * quantity, 0);
    const onlyAddedProducts = products.filter(({ quantity }) => quantity > 0);
    setProducts(productsToUpdate);
    setCart({ ...cart, totalPrice, products: onlyAddedProducts });
    setCartLS({ ...cart, totalPrice, products: onlyAddedProducts });
  };

  const context = {
    userData,
    setUserData,
    cart,
    products,
<<<<<<< HEAD
    saveProducts,
=======
>>>>>>> 1f2a1d7ad937c3859c51af0e32d644722ab7066c
    orders,
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
