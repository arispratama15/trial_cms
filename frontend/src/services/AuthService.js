// src/services/AuthService.js

import axios from 'axios';

const url = 'https://aris.hollacode.com/';

export default {
  login(credentials) {
    return axios
      .post(url + 'auth', credentials)
      .then(response => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + 'sign-up/', credentials)
      .then(response => response.data);
  }
  // getSecretContent() {
  //   return axios.get(url + 'orang-test/').then(response => response.data);
  // }
};