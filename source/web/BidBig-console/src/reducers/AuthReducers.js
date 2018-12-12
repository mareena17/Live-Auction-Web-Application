import { createAction, handleActions } from "redux-actions";
import AT from "../actions/ActionTypes";
import _ from "lodash";

export const setAuthentication = createAction(AT.SET_AUTHENTICATION);

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null
};

const auth = handleActions(
  {
    [AT.SET_AUTHENTICATION]: (state, action) => {
      return action.error ? state : _.merge({}, state, action.payload);
    },

    [AT.USER_LOGOUT]: () => {
      return initialState;
    }
  },
  initialState
);

export default auth;
