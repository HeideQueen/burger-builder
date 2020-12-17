import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (authData) => ({
  type: actionTypes.AUTH_SUCCESS,
  authData: authData,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error: error,
});

export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    dispatch(authStart());

    const API_KEY = 'AIzaSyCShp8D_tCcZhpCNgF5Wuk4llAiB0I2aIQ';

    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    if (!isSignup) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    }
    try {
      const response = await axios.post(url, authData);
      console.log(response);
      dispatch(authSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(authFail(error));
    }
  };
};
