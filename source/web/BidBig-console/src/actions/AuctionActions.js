import AT from '../actions/ActionTypes';
import * as api from '../api/apis';

export const createAuctionSchedule = schedule => () => {
  return api.createAuctionSchedule(schedule);
};

export const bookSlotForAuction = schedule => () => {
  return api.bookSlotForAuction(schedule);
};

export const clearSlots = () => {
  return {
    type: AT.CLEAR_SLOTS
  };
};

export const fetchAllSlots = (startDate, endDate) => dispatch => {
  return api
    .fetchAllSlots({ startDate, endDate })
    .then(resp => {
      dispatch({
        type: AT.FETCH_SLOTS_SUCCEEDED,
        payload: {
          slots: resp.data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: AT.FETCH_SLOTS_FAILURE,
        error
      });
      return Promise.reject(error);
    });
};

export const fetchAllAuctionItems = (
  datesObj,
  pageIndex,
  pageSize,
  order,
  orderBy
) => dispatch => {
  return api
    .fetchAllAuctionItems(datesObj, pageIndex, pageSize, order, orderBy)
    .then(resp => {
      dispatch({
        type: AT.FETCH_AUCTION_ITEMS_SUCCEEDED,
        payload: {
          auctionItems: resp.data.content,
          count: resp.data.totalElements,
          pageIndex,
          pageSize,
          order,
          orderBy
        }
      });
    })
    .catch(error => {
      dispatch({
        type: AT.FETCH_AUCTION_ITEMS_FAILURE,
        error
      });
      return Promise.reject(error);
    });
};
