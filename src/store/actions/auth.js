import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: {
    token,
    userId,
  },
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error: error,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout);
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    dispatch(authStart());

    const API_KEY = process.env.REACT_APP_API_KEY;

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

      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );

      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);

      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
      dispatch(authFail(error.response.data.error));
    }
  };
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
