import AT from './ActionTypes';
import * as api from '../api/apis';
import { persistConfig } from '../config/storeConfig';

export const loginUser = credentials => dispatch => {
  return api.submitUserLoginCredentials(credentials).then(() => {
    dispatch(fetchAndSetCurrentUser());
    dispatch(fetchAndSetUserRole());
  });
};

export const resetPassword = newPassword => () => {
  return api.resetPassword(newPassword);
};

export const forgotPassword = username => () => {
  return api.forgotPassword(username);
};

export const registerUser = formData => () => {
  const registerData = {};
  registerData['user'] = {
    username: formData.username,
    password: formData.password,
    email: formData.email
  };
  registerData['profile'] = {
    name: formData.name,
    address: formData.address,
    city: formData.city,
    zip: parseInt(formData.zip)
  };
  return api.signupUser(registerData);
};

export const fetchAndSetCurrentUser = () => dispatch => {
  return new Promise(resolve => {
    return api.fetchCurrentUserDetails().then(({ data }) => {
      dispatch({
        type: AT.SET_CURRENT_USER,
        payload: data
      });
      return resolve(data);
    });
  });
};

export const fetchAndSetUserRole = () => dispatch => {
  return new Promise(resolve => {
    return api.fetchCurrentUserRole().then(({ data }) => {
      dispatch({
        type: AT.SET_USER_ROLE,
        payload: {
          authorities: data.authorities
        }
      });
      return resolve(data);
    });
  });
};

export const updateProfile = account => dispatch => {
  return new Promise(resolve => {
    const userData = {
      name: account.username,
      email: account.email
    };
    userData['profile'] = {
      id: account.id,
      name: account.name,
      address: account.address,
      city: account.city,
      zip: parseInt(account.zip)
    };
    return api.updateCurrentUserDetails(userData).then(({ data }) => {
      dispatch({
        type: AT.UPDATE_USER_PROFILE_SUCCEEDED,
        payload: data
      });
      return resolve(data);
    });
  });
};

export const setUserDetails = payload => {
  return {
    type: AT.SET_USER_DETAILS,
    payload
  };
};

export const logout = () => {
  localStorage.removeItem(`persist:${persistConfig.key}`);
  return {
    type: AT.USER_LOGOUT
  };
};
