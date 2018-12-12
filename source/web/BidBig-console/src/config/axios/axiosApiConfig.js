import axios from 'axios';
import store from '../storeConfig';
import _ from 'lodash';

import { logout } from '../../actions/UserActions';
import { setAuthentication } from '../../reducers/AuthReducers';

const apiInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

apiInstance.interceptors.request.use(
  config => {
    const isPublic = checkPublicRoutes(config.url);

    if (isPublic || config.headers.Authorization) {
      if (config.url.indexOf('/uaa/oauth/token') !== -1) {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        config.headers.Authorization = 'Basic YnJvd3Nlcjo=';
      }
      return config;
    }

    const { auth } = store.getState();
    const userToken = _.get(auth, 'accessToken');
    // userToken = "cdcf8c17-66d5-4c86-a451-3850597e62eb";
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

apiInstance.interceptors.response.use();

const publicRoutes = [
  '/uaa/oauth/token',
  '/register',
  '/uaa/resetted',
  '/uaa/users/reset'
];

function checkPublicRoutes(url) {
  return publicRoutes.find(path => url.indexOf(path) !== -1);
}

apiInstance.interceptors.response.use(
  response => {
    const url = _.get(response, 'request.responseURL');
    const isLogin = url && url.indexOf('/uaa/oauth/token') !== -1;

    if (isLogin) {
      const accessToken = _.get(response, 'data.access_token');
      const refreshToken = _.get(response, 'data.refresh_token');
      const expirationTime = _.get(response, 'data.expires_in');
      const scope = _.get(response, 'data.scope');

      store.dispatch(
        setAuthentication({
          isAuthenticated: true,
          expires: expirationTime,
          accessToken,
          refreshToken,
          scope
        })
      );
      // store.dispatch(setUserDetails(response.data.user));
    }
    return response;
  },
  error => {
    const { response } = error;
    if (response && response.status === 401) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
