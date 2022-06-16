import { combineReducers } from 'redux';

import { inventoryReducer, initialInventoryState } from './inventory';
import { restockReducer, initialRestockState } from './restock';


const reducers = {
  inventory: inventoryReducer,
  restock: restockReducer,
};

export const initialAppState = {
  inventory: initialInventoryState,
  restock: initialRestockState,
};

export default combineReducers(reducers);
