import axios from 'axios';

function postLogin(email, password) {
  return axios
    .post('http://localhost:3001/login', {
      email,
      password,
    })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function postRegister(email, name, password) {
  return axios
    .post('http://localhost:3001/register', {
      email,
      name,
      password,
    })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function getProducts(token) {
  return axios
    .get('http://localhost:3001/product', { headers: { Authorization: token } })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

<<<<<<< HEAD
function getSales(token) {
  return axios
    .get('http://localhost:3001/sale', { headers: { Authorization: token } })
=======
function getOrders(token) {
  return axios.get('http://localhost:3001/orders', { headers: { Authorization: token } })
>>>>>>> eb2af964a3061cebd15c9bab731e15b542b59fa0
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

<<<<<<< HEAD
export { postLogin, postRegister, getProducts, getSales };
=======
export {
  postLogin,
  postRegister,
  getProducts,
  getOrders,
};
>>>>>>> eb2af964a3061cebd15c9bab731e15b542b59fa0
