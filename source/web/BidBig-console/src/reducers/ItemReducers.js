import AT from '../actions/ActionTypes';

const itemsDefaults = {
  itemsDialogOpen: false,
  pageSize: 3,
  pageIndex: 0,
  count: 0,
  items: [],
  selectedItem: null
};

export const items = (state = { itemsDefaults }, action) => {
  switch (action.type) {
    case AT.FETCH_ALL_ITEMS_SUCCEEDED:
      return {
        ...state,
        items: action.payload.items,
        count: action.payload.count,
        pageIndex: action.payload.pageIndex,
        pageSize: action.payload.pageSize
      };
    case AT.FETCH_ALL_ITEMS_FAILURE:
      return {
        ...state
      };
    case AT.ITEMS_DIALOG_OPEN:
      return {
        ...state,
        itemsDialogOpen: true
      };
    case AT.ITEMS_DIALOG_CLOSE:
      return {
        ...state,
        selectedItem: null,
        itemsDialogOpen: false
      };
    case AT.SET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: action.payload
      };
    default:
      return state;
  }
};
