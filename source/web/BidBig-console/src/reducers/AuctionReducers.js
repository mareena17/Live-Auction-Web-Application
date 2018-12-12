import AT from '../actions/ActionTypes';

const auctionItemsTableHeaders = [
  {
    id: 'itemId',
    numeric: false,
    label: 'Username',
    sortable: true
  },
  {
    id: 'auctionDate',
    numeric: false,
    label: 'Auction Date',
    sortable: true
  },
  {
    id: 'startTime',
    numeric: false,
    label: 'Start Time',
    sortable: true
  },
  {
    id: 'endTime',
    numeric: false,
    label: 'End Time',
    sortable: true
  },
  {
    id: 'actions',
    numeric: false,
    label: 'Actions',
    sortable: false
  }
];

const auctionDefaults = {
  auctionDate: '',
  startTime: '10:00',
  endTime: '12:00',
  slotsCount: 24,
  auctionStartDate: '',
  auctionEndDate: '',
  slots: [],
  auctionItems: [],
  tableHeaders: auctionItemsTableHeaders,
  pageIndex: 0,
  pageSize: 10,
  order: 'desc',
  orderBy: 'auctionDate',
  count: 0
};

export const auctions = (state = auctionDefaults, action) => {
  switch (action.type) {
    case AT.FETCH_SLOTS_SUCCEEDED:
      return {
        ...state,
        slots: action.payload.slots
      };
    case AT.FETCH_AUCTION_ITEMS_SUCCEEDED:
      return {
        ...state,
        auctionItems: action.payload.auctionItems,
        count: action.payload.count,
        pageIndex: action.payload.pageIndex,
        pageSize: action.payload.pageSize,
        order: action.payload.order,
        orderBy: action.payload.orderBy
      };
    case AT.CLEAR_SLOTS:
      return {
        ...state,
        slots: []
      };
    default:
      return state;
  }
};
