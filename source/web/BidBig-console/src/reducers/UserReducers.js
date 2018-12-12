import AT from '../actions/ActionTypes';

const userDefaults = {
  id: '',
  email: '',
  username: '',
  name: '',
  address: '',
  city: '',
  zip: 0,
  roles: []
};

export const user = (state = userDefaults, action) => {
  switch (action.type) {
    case AT.SET_CURRENT_USER:
      return {
        ...state,
        id: action.payload.profile.id,
        email: action.payload.email,
        username: action.payload.name,
        name: action.payload.profile.name,
        address: action.payload.profile.address,
        city: action.payload.profile.city,
        zip: action.payload.profile.zip
      };
    case AT.SET_USER_ROLE:
      return {
        ...state,
        roles: action.payload.authorities
      };
    case AT.UPDATE_USER_PROFILE_SUCCEEDED:
      return {
        ...state
        /* name: action.payload.profile.name,
        address: action.payload.profile.address,
        city: action.payload.profile.city,
        zip: action.payload.profile.zip */
      };
    default:
      return state;
  }
};
