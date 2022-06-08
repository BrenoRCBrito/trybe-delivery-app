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

function getOrders(token) {
  return axios.get('http://localhost:3001/orders', { headers: { Authorization: token } })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

// too many parameters
function postAdminRegister({ userEmail, userName, userPassword, userRole, token }) {
  return axios
    .post('http://localhost:3001/register/admin', {
      email: userEmail,
      name: userName,
      password: userPassword,
      role: userRole,
    },
    { headers: { Authorization: token } })
    .then((res) => res.data)
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
  postAdminRegister,
  postLogin,
  postRegister,
  getProducts,
  getOrders,
  getSellers,
  postOrder,
};
