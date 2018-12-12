import AT from './ActionTypes';
import * as api from '../api/apis';

export const createItem = data => () => {
  return api.createItem(data);
};

export const fetchAllItems = (
  username,
  pageIndex = 0,
  pageSize = 10
) => dispatch => {
  return api
    .fetchAllItems(username, pageIndex, pageSize)
    .then(resp => {
      dispatch({
        type: AT.FETCH_ALL_ITEMS_SUCCEEDED,
        payload: {
          items: resp.data.content,
          count: resp.data.totalElements,
          pageIndex,
          pageSize
        }
      });
    })
    .catch(error => {
      dispatch({
        type: AT.FETCH_ALL_ITEMS_FAILURE,
        error
      });
      return Promise.reject(error);
    });
};

export const deleteItem = itemId => () => {
  return api.deleteItem(itemId);
};

export const editItem = (itemId, item) => () => {
  return api.editItem(itemId, item);
};

export const getImage = imageSrc => () => {
  return api.getImage(imageSrc);
};

export const getItemById = itemId => () => {
  return api.getItemById(itemId);
};

export const setStatusToAuctioned = itemId => () => {
  return api.setStatusToAuctioned(itemId);
};

export const openItemsDialog = () => {
  return {
    type: AT.ITEMS_DIALOG_OPEN
  };
};

export const closeItemsDialog = () => {
  return {
    type: AT.ITEMS_DIALOG_CLOSE
  };
};

export const setSelectedItem = item => {
  return {
    type: AT.SET_SELECTED_ITEM,
    payload: item
  };
};
