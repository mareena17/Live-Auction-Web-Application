import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers/reducers';
import thunk from 'redux-thunk';
//import logger from 'redux-logger';

export const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth', 'user']
};

const pReducer = persistReducer(persistConfig, reducers);
const enhancers = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(pReducer, {}, enhancers);

export const persistor = persistStore(store);
export default store;
