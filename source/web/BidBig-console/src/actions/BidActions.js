import AT from '../actions/ActionTypes';
import * as api from '../api/apis';

export const fetchBidDetails = itemId => dispatch => {
  return api
    .fetchBidDetails(itemId)
    .then(resp => {
      dispatch({
        type: AT.FETCH_BIDS_SUCCEEDED,
        payload: {
          bids: resp.data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: AT.FETCH_BIDS_FAILURE,
        error
      });
      return Promise.reject(error);
    });
};

export const fetchCurrentAuctionDetails = () => () => {
  return api.fetchCurrentAuctionDetails();
};

export const sendBid = bid => () => {
  return api.sendBid(bid);
};

export const fetchMaxBiddingPrice = auctionId => () => {
  return api.fetchMaxBiddingPrice(auctionId);
};
