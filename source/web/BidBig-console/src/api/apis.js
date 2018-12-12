import { api as client } from '../config/axiosConfig';
import 'url-search-params-polyfill';

// User
export const submitUserLoginCredentials = credentials => {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'password');
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);
  formData.append('scope', 'ui');

  return client.post('/uaa/oauth/token', formData.toString());
};
export const forgotPassword = username => {
  return client.post('/uaa/users/reset', {username});
};

export const resetPassword = payload => {
  return client.post('/uaa/users/resetted', payload);
};

export const signupUser = registerData => {
  return client
    .post('/accounts/', registerData)
    .catch(error => console.log('Error creating an account', error));
};
export function fetchCurrentUserDetails() {
  return client.get('/accounts/current');
}

export function fetchCurrentUserRole() {
  return client.get('/uaa/users/current');
}

export function updateCurrentUserDetails(account) {
  return client.put('/accounts/current', account);
}

// Items
export function createItem(data) {
  return client.post('/items/item', data);
}

export function fetchAllItems(username, pageIndex, pageSize) {
  return client.get(
    `/items/page/${username}?page=${pageIndex}&size=${pageSize}`
  );
}

export function editItem(itemId, item) {
  return client.put(`/items/item/${itemId}`, item);
}

export function getItemById(itemId) {
  return client.get(`/items/item/${itemId}`);
}

export function deleteItem(itemId) {
  return client.delete(`/items/item/${itemId}`);
}

export function getImage(imageSrc) {
  return client.get(imageSrc, {
    responseType: 'arraybuffer'
  });
}

export function setStatusToAuctioned(itemId) {
  return client.put(`/items/item/status/${itemId}`);
}

// Auctions
export function createAuctionSchedule(schedule) {
  return client.post('/auctions/create', schedule);
}

export function bookSlotForAuction(schedule) {
  return client.post('/auctions/update', schedule);
}

export function fetchAllSlots(dateRange) {
  return client.post('/auctions/list', dateRange);
}

export function fetchAllAuctionItems(
  datesObj,
  pageIndex,
  pageSize,
  order,
  orderBy
) {
  return client.post(
    `/auctions/item/list?page=${pageIndex}&size=${pageSize}&sort=${orderBy},${order}`,
    datesObj
  );
}

// Bids
export function fetchBidDetails(itemId) {
  return client.get(`/bids/all/${itemId}`);
}

export function fetchCurrentAuctionDetails() {
  return client.get('/auctions/current');
}

export function sendBid(bid) {
  return client.post('/bids/new', bid);
}

export function fetchMaxBiddingPrice(auctionId) {
  return client.get(`/bids/highest/${auctionId}`);
}
