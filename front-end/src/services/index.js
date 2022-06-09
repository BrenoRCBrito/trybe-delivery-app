import axios from 'axios';

const DEFAULT_PORT = 3001;

const REACT_APP_HOSTNAME = process.env.REACT_APP_HOSTNAME || 'http://localhost';
const REACT_APP_BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || DEFAULT_PORT;

const URI = `${REACT_APP_HOSTNAME}:${REACT_APP_BACKEND_PORT}`;

function postLogin(email, password) {
  return axios
    .post(`${URI}/login`, {
      email,
      password,
    })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function postRegister(email, name, password) {
  return axios
    .post(`${URI}/register`, {
      email,
      name,
      password,
    })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function getProducts(token) {
  return axios
    .get(`${URI}/product`, { headers: { Authorization: token } })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function getSales(token) {
  return axios
    .get(`${URI}/sale`, { headers: { Authorization: token } })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function getSale(token, id) {
  return axios
    .get(`${URI}/sale/${id}`, {
      headers: { Authorization: token },
    })
    .then((res) => res.data.sale)
    .catch((err) => err.response.status);
}

function postAdminRegister({
  userEmail,
  userName,
  userPassword,
  userRole,
  token,
}) {
  return axios
    .post(
      `${URI}/register/admin`,
      {
        email: userEmail,
        name: userName,
        password: userPassword,
        role: userRole,
      },
      { headers: { Authorization: token } },
    )
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function getSellers(token) {
  return axios
    .get(`${URI}/user`, { headers: { Authorization: token } })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function postSale(token, cart) {
  return axios
    .post(`${URI}/sale`, cart, {
      headers: { Authorization: token },
    })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function updateSale(token, saleId, status) {
  return axios
    .patch(
      `${URI}/sale/${saleId}`,
      {
        status,
      },
      { headers: { Authorization: token } },
    )
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

function deleteUser(token, id) {
  return axios
    .delete(`${URI}/user/${id}`, {
      headers: { Authorization: token },
    })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}

export {
  postAdminRegister,
  postLogin,
  postRegister,
  getProducts,
  getSales,
  getSale,
  getSellers,
  postSale,
  updateSale,
  deleteUser,
};
