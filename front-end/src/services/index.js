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

function getSales(token) {
  return axios.get('http://localhost:3001/sale', { headers: { Authorization: token } })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function getSale(token, id) {
  return axios.get(`http://localhost:3001/sale/${id}`, { headers: { Authorization: token } })
    .then((res) => res.data.sale)
    .catch((err) => err.response.status);
}

function getSellers(token) {
  return axios.get('http://localhost:3001/user', { headers: { Authorization: token } })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function postOrder(token, cart) {
  return axios.post('http://localhost:3001/sale', cart, { headers: { Authorization: token } })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

export {
  postLogin,
  postRegister,
  getProducts,
  getSales,
  getSale,
  getSellers,
  postOrder,
};
