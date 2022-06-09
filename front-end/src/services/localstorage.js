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

const setCheckoutLS = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

const getCheckoutLS = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart || INITIAL_CART;
};

const clearCheckoutLS = () => localStorage.setItem('cart', JSON.stringify(INITIAL_CART));

export {
  getUserLS,
  setUserLS,
  clearLocalStorage,
  setCheckoutLS,
  getCheckoutLS,
  clearCheckoutLS,
  INITIAL_CART,
};
