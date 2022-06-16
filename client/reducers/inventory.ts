import { IInventoryState } from '@/types';


export const initialInventoryState: IInventoryState = {
  items: [],
  isRetrieving: false,
  lowStockOn: false,
  errorRetrieve: {},
};

export const inventoryReducer = (
  state: IInventoryState = initialInventoryState,
  action: any,
): IInventoryState => {
  switch (action.type) {
    case 'START_RETRIEVE_INVENTORY':
      return { ...state, isRetrieving: true, errorRetrieve: {} };

    case 'STOP_RETRIEVE_INVENTORY':
      return { ...state, isRetrieving: false };

    case 'SET_INVENTORY_ITEMS':
      return { ...state, items: action.items };

    case 'LOW_STOCK_SHOW':
      return { ...state, lowStockOn: true };

    case 'LOW_STOCK_CLOSE':
      return { ...state, lowStockOn: false };

    case 'INVENTORY_ERROR':
      return { ...state, errorRetrieve: action.errorRetrieve };

    case 'INVENTORY_RESET':
      return { ...initialInventoryState };

    default:
      return state;
  }
};
