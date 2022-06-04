import axios from 'axios';

function postLogin(email, password) {
  return axios.post('http://localhost:3001/login', {
    email,
    password,
  })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function postRegister(email, name, password) {
  return axios.post('http://localhost:3001/register', {
    email,
    name,
    password,
  })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function getProducts(token) {
  return axios.get('http://localhost:3001/product', { headers: { Authorization: token } })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

export { postLogin, postRegister, getProducts };
