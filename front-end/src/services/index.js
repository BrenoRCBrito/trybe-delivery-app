import axios from 'axios';

export default function postLogin(email, password) {
  return axios.post('http://localhost:3333/login', {
    email,
    password,
  })
    .then((res) => res.data)
    .catch((err) => err.response.status);
}
