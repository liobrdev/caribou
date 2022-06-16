import { IRestockState } from '@/types';


export const initialRestockState: IRestockState = {
  cart: {},
  isSending: false,
  lowestTotalRestockCost: 0,
  errorRestock: {},
};

export const restockReducer = (
  state: IRestockState = initialRestockState,
  action: any,
): IRestockState => {
  switch (action.type) {
    case 'START_SEND_CART':
      return { ...state, isSending: true, errorRestock: {} };

    case 'STOP_SEND_CART':
      return { ...state, isSending: false };

    case 'SUCCESS_SEND_CART':
      return {
        ...state,
        lowestTotalRestockCost: action.lowestTotalRestockCost,
        isSending: false,
      };

    case 'UPDATE_CART':
      return {
        ...state,
        cart: { ...state.cart, [action.itemId]: action.quantity },
      };
    
    case 'RESTOCK_ERROR':
      return { ...state, errorRestock: action.errorRestock };

    case 'RESTOCK_RESET':
      return { ...initialRestockState };

    default:
      return state;
  }
};
