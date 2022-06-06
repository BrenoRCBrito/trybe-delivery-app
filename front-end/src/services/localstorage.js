const getUserLS = () => JSON.parse(localStorage.getItem('user'));

const setUserLS = (userDate) => localStorage.setItem('user', JSON.stringify(userDate));

const clearLocalStorage = () => localStorage.clear();

const setCartLS = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

const getCartLS = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart || {
    products: [],
    totalPrice: 0,
    deliveryAddress: '',
    sellerId: '',
    userId: '' };
};

const clearCartLS = () => localStorage.removeItem('cart');

export {
  getUserLS,
  setUserLS,
  clearLocalStorage,
  setCartLS,
  getCartLS,
  clearCartLS,
};
