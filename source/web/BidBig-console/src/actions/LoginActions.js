import AT from "./ActionTypes";
import * as api from "../api/apis";

export const fetchLoginDetails = () => {
  return dispatch => {
    return api
      .fetchLoginDetails()
      .then(response => {
        console.log("response: ", response);
        dispatch({
          type: AT.FETCH_LOGIN_DETAILS_SUCCEEDED,
          payload: response.data
        });
      })
      .catch(error => {
        console.log("Request failed", error);
      });
  };
};
