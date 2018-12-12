import AT from '../actions/ActionTypes';

const bidsTableHeaders = [
  {
    id: 'userId',
    numeric: false,
    label: 'Username',
    sortable: true
  },
  {
    id: 'amount',
    numeric: false,
    label: 'Bidding Amount ($)',
    sortable: true
  },
  {
    id: 'created',
    numeric: false,
    label: 'Created At',
    sortable: true
  }
];
const bidDefaults = {
  bids: [],
  pageIndex: 0,
  pageSize: 5,
  order: 'desc',
  orderBy: 'amount',
  count: 0,
  tableHeaders: bidsTableHeaders
};

export const bids = (state = bidDefaults, action) => {
  switch (action.type) {
    case AT.FETCH_BIDS_SUCCEEDED:
      return {
        ...state,
        bids: action.payload.bids
      };
    case AT.FETCH_BIDS_FAILURE:
      return {
        ...state,
        bids: []
      };
    case AT.CLEAR_BIDS:
      return {
        ...state,
        bids: []
      };
    default:
      return state;
  }
};
