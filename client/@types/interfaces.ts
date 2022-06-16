// Misc
export interface IBreadcrumbListItem {
  '@type': string;
  position: number;
  name: string;
  item: string;
}

export interface IErrorMsg {
  id: string;
  msg: string;
}

export interface IErrorInfo {
  [key: string]: IErrorMsg[];
}

export interface IInventoryItem {
  id: number;
  name: string;
  stock: number;
  capacity: number;
}

export interface IRestockCart {
  [key: string]: number;
}

// Reducer states
export interface IInventoryState {
  items: IInventoryItem[];
  isRetrieving: boolean;
  lowStockOn: boolean;
  errorRetrieve: IErrorInfo;
}

export interface IRestockState {
  cart: IRestockCart;
  isSending: boolean;
  lowestTotalRestockCost: number;
  errorRestock: IErrorInfo;
}
