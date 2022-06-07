const INITIAL_CART = {
  cart: {
    totalPrice: 0,
    deliveryAddress: '',
    deliveryNumber: '',
    sellerId: '',
  },
  products: [],
};

const getUserLS = () => JSON.parse(localStorage.getItem('user'));

const setUserLS = (userDate) => localStorage.setItem('user', JSON.stringify(userDate));

const clearLocalStorage = () => localStorage.clear();

const setCartLS = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

const getCartLS = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart || INITIAL_CART;
};

const clearCartLS = () => localStorage.setItem('cart', JSON.stringify(INITIAL_CART));

export {
  getUserLS,
  setUserLS,
  clearLocalStorage,
  setCartLS,
  getCartLS,
  clearCartLS,
};
