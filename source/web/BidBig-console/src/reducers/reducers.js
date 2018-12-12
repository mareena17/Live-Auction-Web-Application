import { combineReducers } from 'redux';
import { user } from './UserReducers';
import auth from './AuthReducers';
import { items } from './ItemReducers';
import { auctions } from './AuctionReducers';
import { bids } from './BidReducers';
const reducers = combineReducers({
  user,
  auth,
  items,
  auctions,
  bids
});

export default reducers;
